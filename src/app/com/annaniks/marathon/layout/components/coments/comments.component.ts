import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { Comment } from '../../../core/models';
import * as moment from 'moment';

@Component({
    selector: "app-comments",
    templateUrl: "comments.component.html",
    styleUrls: ["comments.component.scss"]
})

export class CommentsComponent implements OnInit {
    public comments:Comment;
    public role: string

    @Output('likeOrDislike') private _isLikeOrDislike: EventEmitter<object> = new EventEmitter();
    @Output('sendMessage') private _sendMessage: EventEmitter<string> = new EventEmitter();
    @Input() type: string;
    public showReplay: boolean = false;
    public isOpenComments: boolean = false
    @Input('comments')
    set setComment($event:Comment) {
        this.comments = $event
    }
    @Input('role')
    set setRole($event) {
        this.role = $event
    }
    @Input('isShowSubMessages')
    set setShowRepey($event) {
        this.showReplay = $event
    }
    constructor(@Inject("FILE_URL") public fileUrl: string) { }

    ngOnInit() { }

    public isOpenReplay(): void {
        this.showReplay = !this.showReplay;
    }
    public vote(type: string, item, isChild: boolean = false) {
        this._isLikeOrDislike.emit({ type: type, url: item.url, isChild: isChild })
    }
    public getUserImage(item) {
        if (item) {
            let defaultImage = '/assets/images/user-icon-image.png'
            if (this.role == 'client' || (!this.role && item.user_coach)) {
                return item.user_coach && item.user_coach.user && item.user_coach.user.avatar ? this.fileUrl + item.user_coach.user.avatar : defaultImage
            }
            if (this.role === 'coach' || (!this.role && item.comment_coach)) {
                return item.user_coach && item.comment_coach.user && item.comment_coach.user.avatar ? this.fileUrl + item.comment_coach.user.avatar : defaultImage
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
        this._sendMessage.emit($event)
    }
    public getCreatorName(item):string {
        if (item) {
            if (this.role == 'client' || (!this.role && item.user_coach)) {
                return `${item.user_coach.user.first_name} ${item.user_coach.user.last_name}`
            }
            if (this.role === 'coach' || (!this.role && item.comment_coach)) {
                return `${item.comment_coach.user.first_name} ${item.comment_coach.user.last_name}`
            }
        }
    }
    
}

