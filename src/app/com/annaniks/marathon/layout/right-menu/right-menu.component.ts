import { Component, OnInit, Inject } from "@angular/core";
import { ContactItem, FollowItem } from '../../core/models';
import { UserService } from '../../core/services/user.service';
import { ProfileService } from '../../core/services/profile.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Familiar, FamiliarData } from '../../core/models/user';
import { ITopic } from '../../core/models/topic';
import { TopicActions, ChatService } from '../../core/services/chat.service';
import { TopicMessage } from '../../core/models/topic-message';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: "app-right-menu",
    templateUrl: "right-menu.component.html",
    styleUrls: ["right-menu.component.scss"]
})

export class RightMenuComponent implements OnInit {
    public isShowChatItem: boolean = false;
    public activeChat;
    public contactItem: ContactItem[] = [
        { avatar: "assets/images/img1.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img2.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img1.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img.4.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img5.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img6.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img7.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img8.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img1.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img2.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img1.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img.4.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img5.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img6.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img7.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img8.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img.4.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img5.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img6.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img7.png", name: "Olivie Gipson" },
        { avatar: "assets/images/img8.png", name: "Olivie Gipson" },
    ]
    public followItem: Familiar[] = []
    topics: ITopic[];
    topicActions: TopicActions[];
    private unsubscribe$ = new Subject<void>()

    constructor(private _profileUserService: UserService,
        private chatService: ChatService,
        private _profileService: ProfileService) {
        
        this.topicActions = [];
        this.chatService.topicActions.subscribe(value => {
            this.topicActions = [];
            value.forEach(ta => this.topicActions.push(ta));
        });     
       
    }

    ngOnInit() {
        this._getFamiliarList()
        this.loadAll()
    }

    loadAll(): void {
        this.chatService.queryTopics().subscribe((res: HttpResponse<ITopic[]>) => {
            if (res && res.body) {
                this.chatService.updateTopics(res.body);
                for (let i = 0; i < res?.body?.length; i++) {                   
                    this.topics.push(res.body[i]);
                }
            }
        });
    }
    public closeItem() {
        this.isShowChatItem = false;
    }
    public getUser() {
        this._getFamiliarList()
    }
    private _getFamiliarList() {
        let userId = this._profileUserService.user && this._profileUserService.user.data ? this._profileUserService.user.data.user.id : null;
        if (userId) {
            this._profileService.getFamiliarList(userId).pipe(takeUntil(this.unsubscribe$)).subscribe((data: FamiliarData) => {
                this.followItem = [];
                data.client = data.client.map((el) => {
                    return Object.assign({}, el, { role: 'client' })
                })
                data.coach = data.coach.map((el) => {
                    return Object.assign({}, el, { role: 'coach' })
                })
                let familiars: Familiar[] = [...data.client, ...data.coach];
                if (familiars && familiars.length)
                    for (let i = 0; i < familiars.length; i++) {
                        if (i < 4) {
                            this.followItem.push(familiars[i])
                        }
                    }

            })
        }
    }

    public openChat(item) {
        this.activeChat = item;
        this.isShowChatItem = true;
    }
    get showUserData(): boolean {
        return this._profileUserService.isAuthorized;
    }

    onScroll(event) { }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}