import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FeedResponseData, ServerResponse } from '../../models';

import * as moment from 'moment';
import { CookieService } from 'ngx-cookie';
import { CommentService } from '../../services/comment.service';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { Subject, forkJoin, Observable, of } from 'rxjs';
import { AuthModal } from '../auth/auth.modal';
import { FeedLikeService } from '../../services/feed-like.service';
import { FeedService } from '../../../pages/main/feed/feed.service';
import { FollowCommentService } from '../../services/follow-comment.service';
@Component({
    selector: "app-property",
    templateUrl: "property.component.html",
    styleUrls: ["property.component.scss"]
})

export class PropertyModal implements OnInit {
    public isShowSubMessages: boolean = false;
    private unsubscribe$ = new Subject<void>()
    public show: boolean = false;
    public isOpen: boolean = false;
    public seeMore: boolean = false;
    public timeStamp: string;
    public content: any;
    public feedItem: FeedResponseData;
    public feedTitle: string;
    public role: string;
    public localImage: string;
    public comments = []
    constructor(@Inject(MAT_DIALOG_DATA) private _data,
        private _dialogRef: MatDialogRef<PropertyModal>,
        private _cookieService: CookieService,
        private _commentService: CommentService,
        @Inject("FILE_URL") public fileUrl: string,
        private _matDialog: MatDialog,
        private _feedService: FeedService,
        private _feedLikeService: FeedLikeService,
        private _followCommentService: FollowCommentService
    ) {
        this.feedItem = _data.data;
        this.localImage = this._data.localImage;
        this.timeStamp = moment(this.feedItem.timeStamp).fromNow();
        this.role = this._cookieService.get('role')


    }

    ngOnInit() {
        if (this.feedItem.feed_media && this.feedItem.feed_media.length) {
            this.content = this.feedItem.feed_media[0].content;
        }
        this._showseeMore();
        this._checkIsGetComment();
        this._checkIsLike()
    }
    private _checkIsGetComment() {
        this._followCommentService.getState().pipe(
            takeUntil(this.unsubscribe$),
            switchMap((data: any) => {
                if (data.isSend) {
                    if (!data.isAuthorizated) {
                        if (data.isCombine) {
                            return this._combineObservable(data.isParent)
                        } else {
                            return this._getComments(data.isParent);
                        }
                    } else {
                        this.onClickOpenAuth();
                        return of()
                    }
                } else {
                    return of()
                }
            })
        ).subscribe()
    }
    private _checkIsLike() {
        this._followCommentService.getLikeState().pipe(
            takeUntil(this.unsubscribe$),
            switchMap((data: any) => {
                if (data.isSend) {
                    if (data.isAuthorizated) {
                        return this._getFeedById()

                    } else {
                        console.log('111111');
                        
                        this.onClickOpenAuth();
                        return of()
                    }
                } else {

                    return of()
                }
            })
        ).subscribe()
    }
    private _showseeMore(): void {
        let titleLength: number;
        if (this.feedItem.title) {
            titleLength = this.feedItem.title.length;
            this.feedTitle = this.feedItem.title;
            if (titleLength > 100) {
                this.seeMore = true;
                this.feedTitle = this.feedItem.title.slice(0, 100);
            }
            else {
                this.seeMore = false;
            }
        }
    }

    private _combineObservable(parent?) {
        const combine = forkJoin(
            this._getComments(parent),
            this._getFeedById()
        )
        return combine
    }


    public onClickOpenAuth(): void {
        this._matDialog.open(AuthModal, {
            width: "100%",
            maxWidth: "100vw",
        })
    }
    private _getFeedById() {
        return this._feedService.getFeedById(this.feedItem.id).pipe(map((result) => {
            this.feedItem = result;
            return result
        }))
    }
    public onClickSeeMore(): void {
        this.feedTitle = this.feedItem.title.slice(0, this.feedItem.title.length);
        this.seeMore = false;
    }
    public onClickOpen($event): void {
        this.isOpen = $event;
        this._getComments().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    private _getComments(parent?): Observable<ServerResponse<Comment[]>> {
        return this._commentService.getFeedCommentById(this.feedItem.id).pipe(map((data: ServerResponse<Comment[]>) => {
            this.comments = data.results;
            this.isShowSubMessages = parent ? true : false;
            return data
        }))
    }


    public closeModal(): void {
        this._dialogRef.close();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}