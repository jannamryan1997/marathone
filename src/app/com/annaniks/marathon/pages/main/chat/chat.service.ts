import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject, BehaviorSubject, from, of, Subject } from 'rxjs';
import { map, timestamp } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { ITopic, Topic } from 'app/shared/model/topic.model';
import { ITopicMessage, TopicMessage } from 'app/shared/model/topic-message.model';
import { Action, ActionData, ActionRequest, ActionResponse } from 'app/chat/generated/chat_pb';
import { Chat } from 'app/chat/generated/chat_pb_service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

type EntityResponseType = HttpResponse<ITopic>;
type EntityArrayResponseType = HttpResponse<ITopic[]>;

import { grpc } from '@improbable-eng/grpc-web';
import { AccountService } from 'app/core/auth/account.service';
import { UnaryOutput } from '@improbable-eng/grpc-web/dist/typings/unary';

export class TopicActions {
  public actions = {};
  public timeStamps = {};
  public lastReads = {};
  constructor(public id: number) {}

  acceptAction(action: ActionData): void {
    if (action.getServerat() <= (this.timeStamps[action.getServerid()] || 0)) {
      return;
    }
    this.actions[action.getServerid()] = Action.ACTION_OFFLINE;
    this.timeStamps[action.getServerid()] = action.getServerat();
    this.lastReads[action.getServerid()] = 0;

    switch (action.getAction()) {
      case Action.ACTION_OFFLINE:
      case Action.ACTION_ONLINE:
        this.actions[action.getServerid()] = action.getAction();
        break;
      case Action.ACTION_TOPIC_FULL:
      case Action.ACTION_TOPIC_EMPTY:
      case Action.ACTION_TOPIC_READ:
      case Action.ACTION_TOPIC_MESSAGE:
        if (action.getTopic() === this.id) {
          this.acceptTopicAction(action);
        }
        break;
    }
  }

  acceptTopicAction(action: ActionData): void {
    switch (action.getAction()) {
      case Action.ACTION_TOPIC_FULL:
        this.actions[action.getServerid()] = Action.ACTION_TOPIC_FULL;
        this.lastReads[action.getServerid()] = action.getServerat();
        break;
      case Action.ACTION_TOPIC_EMPTY:
        this.actions[action.getServerid()] = Action.ACTION_TOPIC_EMPTY;
        this.lastReads[action.getServerid()] = action.getServerat();
        break;
      case Action.ACTION_TOPIC_READ:
        this.actions[action.getServerid()] = Action.ACTION_ONLINE;
        this.lastReads[action.getServerid()] = action.getServerat();
        break;
      case Action.ACTION_TOPIC_MESSAGE:
        this.actions[action.getServerid()] = Action.ACTION_ONLINE;
        this.lastReads[action.getServerid()] = action.getServerat();
        break;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  public topicsResourceUrl = SERVER_API_URL + 'api/client/topics';
  public topicMessagesResourceUrl = SERVER_API_URL + 'api/client/topic-messages';
  public grpcResourceUrl = 'https://support.marathon.me';
  public topicActions = new BehaviorSubject<Array<TopicActions>>([]);
  public topicMessages = new ReplaySubject<ITopicMessage>();
  public sendingMessage = new BehaviorSubject<boolean>(false);

  private lastTopicTextEventType = 0;
  private lastTopicTextEventAt = 0;
  private lastTopicTextEventId = 0;

  constructor(
    protected accountService: AccountService,
    protected http: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {
    this.accountService.authenticationState.subscribe(value => {
      if (value) {
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        const downStreamRequestActionData = new ActionData();
        downStreamRequestActionData.setAction(Action.ACTION_ONLINE);

        const downStreamRequest = new ActionRequest();
        downStreamRequest.setToken(token);
        downStreamRequest.setData(downStreamRequestActionData);

        // downstream
        const SingleDownStreamEnd = (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {};
        const SingleDownStreamMessage = (message: ActionResponse) => {
          console.log('>>>>>>>>>>>>>>>>>>> ' + message.toString());
          const currentValue = this.topicActions.value;
          const existingTopics = new Set(currentValue.map(ta => ta.id));
          const nonExistingTopics = new Set(
            message
              .getDataList()
              .filter(dataListItem => !existingTopics.has(dataListItem.getTopic()))
              .map(dataListItem => dataListItem.getTopic())
          );
          nonExistingTopics.forEach(ta => currentValue.push(new TopicActions(ta)));
          currentValue.forEach(ta =>
            message.getDataList().forEach(a => {
              this.checkForMessage(a);
              ta.acceptAction(a);
            })
          );

          this.topicActions.next(currentValue);
        };

        grpc.invoke(Chat.SingleDownStream, {
          onMessage: SingleDownStreamMessage,
          onEnd: SingleDownStreamEnd,
          host: this.grpcResourceUrl,
          request: downStreamRequest,
        });
      } else {
        // https://stackoverflow.com/questions/37642589/how-can-we-detect-when-user-closes-browser/37642657
      }
    });
  }

  updateTopics(topics: ITopic[]): void {
    const currentValue = this.topicActions.value;
    const existingTopics = new Set(currentValue.map(ta => ta.id));
    const nonExistingTopics = new Set(
      topics.filter(dataListItem => dataListItem.id && !existingTopics.has(dataListItem.id)).map(dataListItem => dataListItem.id)
    );
    nonExistingTopics.forEach(ta => {
      if (ta) {
        currentValue.push(new TopicActions(ta));
      }
    });
    this.topicActions.next(currentValue);
  }

  queryTopics(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ITopic[]>(this.topicsResourceUrl, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertTopicDateArrayFromServer(res)));
  }

  queryMessages(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<ITopicMessage[]>(`${this.topicMessagesResourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertMessageDateArrayFromServer(res)));
  }

  createMessage(topicMessage: ITopicMessage): Observable<EntityResponseType> {
    return this.http
      .post<ITopicMessage>(this.topicMessagesResourceUrl, topicMessage, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertMessageDateFromServer(res)));
  }

  protected convertTopicDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertTopicDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((topic: ITopic) => {
        topic.createdAt = topic.createdAt ? moment(topic.createdAt) : undefined;
      });
    }
    return res;
  }

  protected convertMessageDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((topicMessage: ITopicMessage) => {
        topicMessage.createdAt = topicMessage.createdAt ? moment(topicMessage.createdAt) : undefined;
      });
    }
    return res;
  }

  protected convertMessageDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  sendTopicEvent(topic: ITopic): void {}

  sendTopicTextEvent(topicSelected: ITopic | null, hasText: boolean): void {
    if (topicSelected && topicSelected.id) {
      const topicTextEventType = hasText ? Action.ACTION_TOPIC_FULL : Action.ACTION_TOPIC_EMPTY;
      const topicTextEventId = topicSelected.id;
      const topicTextEventAt = moment().milliseconds();
      if (
        this.lastTopicTextEventId === topicTextEventId &&
        this.lastTopicTextEventType === topicTextEventType &&
        topicTextEventAt - this.lastTopicTextEventAt <= 1 * 60 * 1000
      ) {
        return;
      }

      this.lastTopicTextEventType = topicTextEventType;
      this.lastTopicTextEventId = topicTextEventId;
      this.lastTopicTextEventAt = topicTextEventAt;

      const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');

      const actionData = new ActionData();
      actionData.setAction(topicTextEventType);
      actionData.setTopic(topicSelected.id);
      actionData.setData(`topic-write-${hasText}`);

      const SingleUpStreamMessage = (output: UnaryOutput<ActionResponse>) => {};

      const actionRequest = new ActionRequest();
      actionRequest.setToken(token);
      actionRequest.setData(actionData);
      grpc.unary(Chat.SingleUpStream, {
        host: this.grpcResourceUrl,
        request: actionRequest,
        onEnd: SingleUpStreamMessage,
      });
    }
  }

  sendTopicMessageEvent(topicSelected: ITopic | null, value: any): Observable<boolean> {
    const completion = new ReplaySubject<boolean>();
    if (topicSelected && topicSelected.id && value && typeof value === 'string' && value.length > 0) {
      this.sendingMessage.next(true);
      const topicMessage: TopicMessage = new TopicMessage();
      topicMessage.topicId = topicSelected.id;
      topicMessage.content = value;
      this.createMessage(topicMessage).subscribe(m => {
        this.sendingMessage.next(false);
        completion.next(true);
        completion.complete();
      });
    } else {
      this.sendingMessage.next(false);
      completion.next(false);
      completion.complete();
    }
    return completion;
  }

  checkForMessage(a: ActionData): void {
    if (a && a.getTopic() && a.getAction() === Action.ACTION_TOPIC_MESSAGE) {
      try {
        const topicMessage = new TopicMessage();
        const r = JSON.parse(a.getData());
        topicMessage.id = r.id;
        topicMessage.content = r.content;
        topicMessage.topicId = r.topicId;
        topicMessage.participantId = r.participantId;
        topicMessage.createdAt = moment(r.createdAt);
        if (topicMessage.id && topicMessage.content && topicMessage.topicId && topicMessage.participantId && topicMessage.createdAt) {
          this.topicMessages.next(topicMessage);
        }
      } catch (e) {
        //
      }
    }
  }
}
