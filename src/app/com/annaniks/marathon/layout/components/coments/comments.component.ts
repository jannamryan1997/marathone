import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { Comment } from '../../../core/models';
import * as moment from 'moment';
import { CommentService } from '../../../core/services/comment.service';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { AuthModal } from '../../../core/modals';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FollowCommentService } from '../../../core/services/follow-comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "app-comments",
    templateUrl: "comments.component.html",
    styleUrls: ["comments.component.scss"]
})

export class CommentsComponent implements OnInit {
    public comments: Comment;
    public role: string
    private unsubscribe$ = new Subject<void>()

    @Output('likeOrDislike') private _isLikeOrDislike: EventEmitter<object> = new EventEmitter();
    @Output('sendMessage') private _sendMessage: EventEmitter<string> = new EventEmitter();
    @Input() type: string;
    public showReplay: boolean = false;
    public isOpenComments: boolean = false
    @Input('comments')
    set setComment($event: Comment) {
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
    public feedItemId: number;
    @Input('feedItemId')
    set setfeedItemId($event) {
        // console.log($event);

        this.feedItemId = $event
    }

    constructor(@Inject("FILE_URL") public fileUrl: string,
        private _commentService: CommentService,
        private _commentSubjectService: FollowCommentService,
        private _matDialog: MatDialog, private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this.feedItemId = params.id;
        })
    }

    ngOnInit() { }

    public isOpenReplay(): void {
        this.showReplay = !this.showReplay;
    }
    public vote(type: string, item, isChild: boolean = false) {
        if (this.role) {
            if (type == '0') {
                this._commentService.dislikeComment(item.url).pipe(takeUntil(this.unsubscribe$),

                    map(() => {
                        this._commentSubjectService.onComment(isChild, false)
                    })

                ).subscribe()
            } else {
                if (type == '1') {
                    this._commentService.likeComment(item.url).pipe(takeUntil(this.unsubscribe$),
                        map(() => {
                            this._commentSubjectService.onComment(isChild, false)
                        })

                    ).subscribe()
                }
            }
        } else {
            this._commentSubjectService.onComment(false, false, true)
        }


    }

    public sendMessage($event) {
        const parent = this.comments.url;
        console.log(this.feedItemId);
        console.log(parent);

        if ($event) {
            // this._commentService.createFeedComment(this.feedItemId, $event, parent).pipe(
            //     takeUntil(this.unsubscribe$),
            //     map(() => {
            //         this._commentSubjectService.onComment(parent, true)
            //     })
            // ).subscribe(() => { })
        }
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

    public getCreatorName(item): string {
        if (item) {
            if (this.role == 'client' || (!this.role && item.user_coach)) {
                return `${item.user_coach.user.first_name} ${item.user_coach.user.last_name}`
            }
            if (this.role === 'coach' || (!this.role && item.comment_coach)) {
                return `${item.comment_coach.user.first_name} ${item.comment_coach.user.last_name}`
            }
        }
    }
    ngOndestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

