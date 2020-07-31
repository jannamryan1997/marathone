import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { Comment } from '../../../core/models';
import * as moment from 'moment';
import { CommentService } from '../../../core/services/comment.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: "app-comments",
    templateUrl: "comments.component.html",
    styleUrls: ["comments.component.scss"]
})

export class CommentsComponent implements OnInit {
    public comments: Comment;
    public role: string;
    @Output('likeOrDislike') private _isLikeOrDislike: EventEmitter<any> = new EventEmitter();
    @Output('sendMessage') private _sendMessage: EventEmitter<string> = new EventEmitter();
    @Input() type: string;
    public showReplay: boolean = false;
    public isOpenComments: boolean = false;
    private unsubscribe$ = new Subject<void>();
    public feed;
    @Input('comments')
    set setComment($event: Comment) {
        this.comments = $event;
        if (this.comments) {
            this.showReplay = this.comments.isShowSubMessages
        }
    }
    @Input('feed')
    set setFeed($event) {
        this.feed = $event
    }
    @Input('role')
    set setRole($event: string) {
        this.role = $event
    }

    constructor(@Inject("FILE_URL") public fileUrl: string,
        private _commentService: CommentService) { }

    ngOnInit() { }

    public isOpenReplay(): void {
        this.showReplay = !this.showReplay;
    }
    public vote(type: string, item, isChild) {
        if (this.role) {
            let childUrl:string;
            if (isChild) {
                childUrl = this.comments.url
            }
            
            if (type == '0') {

                this._commentService.dislikeComment(item.url).pipe(takeUntil(this.unsubscribe$),
                    map(() => {
                        this._isLikeOrDislike.emit({ isChild: childUrl })
                    })).subscribe()
            } else {
                if (type == '1') {
                    this._commentService.likeComment(item.url).pipe(takeUntil(this.unsubscribe$),
                        map(() => {
                            this._isLikeOrDislike.emit({ isChild: childUrl })
                        })).subscribe()
                }
            }
        } else {
            this._isLikeOrDislike.emit(false)
        }
    }
    public getUserImage(item) {
        if (item) {
            let defaultImage = '/assets/images/user-icon-image.png';
            if (item.user_coach) {
                return item.user_coach && item.user_coach.avatar ? this.fileUrl + item.user_coach.avatar : defaultImage
            }
            if (item.comment_coach) {
                return item.user_coach && item.comment_coach.avatar ? this.fileUrl + item.comment_coach.avatar : defaultImage
            }
        }
    }
    public convertDate(comment) {
        if (comment && comment.crated_at)
            return moment(comment.crated_at).fromNow()
    }
    public openCommentComponent() {
        this.isOpenComments = !this.isOpenComments
    }
    public sendMessage($event) {
        this._sendMessage.emit($event);
        this.showReplay = true
    }
    public getCreatorName(item): string {
        if (item) {
            if (item.user_coach) {
                return `${item.user_coach.user.first_name} ${item.user_coach.user.last_name}`
            }
            if (item.comment_coach) {
                return `${item.comment_coach.user.first_name} ${item.comment_coach.user.last_name}`
            }
        }
    }
    public getProfleUrl() {
        let role = this.comments.user_coach ? 'client' : 'coach';
        let userId = this.comments.user_coach ? this.comments.user_coach.id : this.comments.comment_coach.id;
        return `/profile/${userId}/${role}`
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

