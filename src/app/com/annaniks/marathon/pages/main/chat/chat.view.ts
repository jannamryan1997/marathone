import { Component } from "@angular/core";
import { ITopic, IUser } from '../../../core/models/topic';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ChatService } from './chat.service';
import { AccountService } from '../../../core/services/account.service';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { JhiEventManager } from 'ng-jhipster';
import { Action } from './generated/chat_pb';

@Component({
    selector: 'app-chat-view',
    templateUrl: 'chat.view.html',
    styleUrls: ['chat.view.scss']
})
export class ChatViewComponent {

    topics: ITopic[];
    topicActions: any[];
    topicMessages: Map<number, any[]>;
    topicSelected: ITopic | null;
    sendingMessage: boolean;
    eventSubscriber?: Subscription;
    inputForm = this.fb.group({
        text: [],
    });

    constructor(
        protected accountService: AccountService,
        protected chatService: ChatService,
        protected eventManager: JhiEventManager,
        private fb: FormBuilder,
        private _userService: UserService
    ) {
        this.topicMessages = new Map<number, any[]>();
        this.sendingMessage = false;
        this.topicActions = [];
        this.chatService.topicActions.subscribe(value => {
            this.topicActions = [];
            value.forEach(ta => this.topicActions.push(ta));
        });
        this.chatService.topicMessages.subscribe(tm => {
            const currentTopicMessages: any[] = this.topicMessages[tm.topicId || 0] || [];
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
                .subscribe((res: HttpResponse<any[]>) => this.addTopicMessages(topicId, res.body || []));
        }
    }

    addTopicMessages(topicId: number, messages: any[]): void {
        const currentTopicMessages: any[] = this.topicMessages[topicId] || [];
        for (let mi = 0; mi < messages.length; mi++) {
            const message: any = messages[mi];
            let exists = false;
            for (let me = 0; me < currentTopicMessages.length; me++) {
                const messageExisting: any = currentTopicMessages[me];
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

    loadAll(): void {
        this.chatService.queryTopics().subscribe((res: HttpResponse<ITopic[]>) => {
            if (res && res.body) {
                this.chatService.updateTopics(res.body);
                for (let i = 0; i < res?.body?.length; i++) {
                    if (i === 0) {
                        this.setSelected(res.body[i]);
                    }
                    this.topics.push(res.body[i]);
                }
            }
        });
    }

    ngOnInit(): void {
        this.loadAll();
    }

    ngOnDestroy(): void {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

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
        if (this._userService.user)
            return this._userService.user.data.id

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
}