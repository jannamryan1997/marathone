import { Component, Input, Inject, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { IUser, ITopic, Topic } from '../../../core/models/topic';
import { Action } from '../../../core/services/generated/chat_pb';
import { HttpResponse } from '@angular/common/http';
import { TopicMessage, ITopicMessage } from '../../../core/models/topic-message';
import { ChatService, TopicActions } from '../../../core/services/chat.service';
import { JhiEventManager } from 'ng-jhipster';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { Subscription, Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']
})
export class ChatComponent {
    public item;
    private _defaultImage: string = '/assets/images/user-icon-image.png';

    @Output('closeItem') private _close = new EventEmitter()

    @Input('activeChat')
    set setActiveUserChat($event) {
        this.item = $event;
    }
    @Input('topics')
    set setTopics($event) {
        this.topics = $event;
        if (this.topics && this.topics[0]) {
            this.setSelected(this.topics[0])
        }
    }
    @Input('topicActions')
    set setTopicActions($event) {
        this.topicActions = $event;

    }
    public messages = []

    topics: ITopic[];
    topicActions: TopicActions[];
    topicMessages: Map<number, TopicMessage[]>;
    topicSelected: ITopic | null;
    sendingMessage: boolean;
    eventSubscriber?: Subscription;
    inputForm = this.fb.group({
        text: [],
    });

    constructor(
        protected chatService: ChatService,
        protected eventManager: JhiEventManager,
        private fb: FormBuilder,
        private _userService: UserService,
        private _cookieService: CookieService,
        @Inject('FILE_URL') public fileURL
    ) {
        this.topicMessages = new Map<number, TopicMessage[]>();
        this.sendingMessage = false;
        // this.topicActions = [];
        // this.chatService.topicActions.subscribe(value => {
        //     this.topicActions = [];
        //     value.forEach(ta => this.topicActions.push(ta));
        // });
        this.chatService.topicMessages.subscribe(tm => {
            const currentTopicMessages: TopicMessage[] = this.topicMessages[tm.topicId || 0] || [];
            const exists = currentTopicMessages.some(cv => cv.id === tm.id);
            if (!exists) {
                currentTopicMessages.push(tm);
                this.topicMessages[tm.topicId || 0] = currentTopicMessages;
            }
        });
        this.chatService.sendingMessage.subscribe(v => (this.sendingMessage = v));
        this.topics = [];
        this.topicSelected = null;
        this.inputForm.get('text')?.valueChanges?.subscribe(value => {
            let text;
            if (value) {
                text = value.toString();
            } else {
                text = '';
            }
            this.chatService.sendTopicTextEvent(this.topicSelected, text.length > 0);
        });
    }

    setSelected(topic: ITopic): void {
        this.inputForm.patchValue({
            text: '',
        });

        this.chatService.sendTopicEvent(topic);
        this.topicSelected = topic;
        const topicId = this.topicSelected.id;
        if (topicId) {
            this.chatService
                .queryMessages(topicId)
                .subscribe((res: HttpResponse<ITopicMessage[]>) => this.addTopicMessages(topicId, res.body || []));
        }
    }

    addTopicMessages(topicId: number, messages: TopicMessage[]): void {
        const currentTopicMessages: TopicMessage[] = this.topicMessages[topicId] || [];
        for (let mi = 0; mi < messages.length; mi++) {
            const message: TopicMessage = messages[mi];
            let exists = false;
            for (let me = 0; me < currentTopicMessages.length; me++) {
                const messageExisting: TopicMessage = currentTopicMessages[me];
                if (messageExisting.id === message.id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                currentTopicMessages.push(message);
            }
        }
        currentTopicMessages.sort((ma, mb) => {
            if ((ma.createdAt || 0) > (mb.createdAt || 0)) {
                return 1;
            }
            if ((ma.createdAt || 0) < (mb.createdAt || 0)) {
                return -1;
            }
            return 0;
        });
        console.log(currentTopicMessages);
        this.topicMessages[topicId] = currentTopicMessages;
    }

    // loadAll(): void {
    //     this.chatService.queryTopics().subscribe((res: HttpResponse<ITopic[]>) => {
    //         if (res && res.body) {
    //             this.chatService.updateTopics(res.body);
    //             for (let i = 0; i < res?.body?.length; i++) {
    //                 if (i === 0) {
    //                     this.setSelected(res.body[i]);
    //                 }
    //                 this.topics.push(res.body[i]);
    //             }
    //         }
    //     });
    // }

    ngOnInit(): void {
        // this.chatService.sendOptionsRequiest().subscribe((data) => {
        // this.loadAll();
        // })
    }

    ngOnDestroy(): void {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }
    //////////////create topic
    save(): void {
        const topic = this.createFromForm();
        //   this.subscribeToSaveResponse(this.topicService.update(topic));
        // } else {
        this.subscribeToSaveResponse(this.chatService.create(topic));
        // }
    }

    private createFromForm(): ITopic {
        let ids = [this.getUserId()]
        return {
            ...new Topic(),
            //   id: this.editForm.get(['id'])!.value,
            title: ids.toString(),
            createdAt: moment(new Date(), "YYYY-MM-DDTHH:mm"),
            marathon: 0,
            creatorId: this.getUserId(),
            //   participants: ?????
            //   this.editForm.get(['participants'])!.value,
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITopic>>): void {
        result.subscribe(
            () => this.onSaveSuccess(),
            () => this.onSaveError()
        );
    }

    protected onSaveSuccess(): void {
        // this.previousState();
    }

    protected onSaveError(): void {
    }



    ////////////////
    formatTopicTitle(topic: ITopic): string {
        const res = [];
        if (topic.participants) {
            for (let i = 0; i < (topic.participants.length || 0); i++) {
                if (topic.participants[i].id !== this.getUserId()) {
                    res.push(topic.participants[i].firstName + ' ' + topic.participants[i].lastName);
                }
            }
        }
        if (res.length === 0 && topic.title) {
            res.push(topic.title);
        }

        return res.join(' , ');
    }

    getUserId(): number {
        let chatId = +this._cookieService.get('chatId');
        return chatId
    }

    isOnline(participant: IUser, topicSelected: ITopic): boolean {
        if (!topicSelected.id || !participant.id) {
            return false;
        }
        for (let index = 0; index < this.topicActions.length; index++) {
            if (this.topicActions[index].id === topicSelected.id && this.topicActions[index].actions[participant.id]) {

                return this.topicActions[index].actions[participant.id] >= Action.ACTION_ONLINE;
            }
        }
        return false;
    }

    isWriting(participant: IUser, topicSelected: ITopic): boolean {
        if (!topicSelected.id || !participant.id) {
            return false;
        }
        for (let index = 0; index < this.topicActions.length; index++) {
            if (this.topicActions[index].id === topicSelected.id && this.topicActions[index].actions[participant.id]) {
                return this.topicActions[index].actions[participant.id] >= Action.ACTION_TOPIC_FULL;
            }
        }
        return false;
    }

    sendText(): void {
        if (this.sendingMessage) {
            return;
        }
        this.chatService.sendTopicMessageEvent(this.topicSelected, this.inputForm.get('text')?.value).subscribe(v => {
            if (v) {
                this.inputForm.get('text')?.patchValue('');
            }
        });
    }
    public getAvatar(item) {
        if (item && item.avatar) {
            // this.fileURL + 
            return item.avatar
        } else {
            return this._defaultImage
        }
    }
    /////
    public send() {
        if (this.inputForm.get('text').value) {
            this.messages.push(
                {
                    role: 'my',
                    message: this.inputForm.get('text').value
                }
            )
            this.inputForm.reset();
        }

    }
    /////
    public getLinkUrl(item) {
        return `/profile/${item.slug}/${item.role}`
    }
    public closeItem() {
        this._close.emit(true)
    }



}