import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { Comment } from '../../../core/models';
import * as moment from 'moment';

@Component({
    selector: "app-comments",
    templateUrl: "comments.component.html",
    styleUrls: ["comments.component.scss"]
})

export class CommentsComponent implements OnInit {
    public comments;
    public role: string

    @Output('likeOrDislike') private _isLikeOrDislike: EventEmitter<object> = new EventEmitter();
    @Output('sendMessage') private _sendMessage: EventEmitter<string> = new EventEmitter();
    @Input() type: string;
    public showReplay: boolean = false;
    public isOpenComments: boolean = false
    @Input('comments')
    set setComment($event) {
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
    public getUserImage(comment) {
        if (comment && comment.user_coach && comment.user_coach.avatar) {
            return this.fileUrl + comment.user_coach.avatar;
        } else {
            return '/assets/images/user-icon-image.png'
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
}

