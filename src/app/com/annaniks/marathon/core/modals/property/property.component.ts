import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FeedResponseData, ServerResponse } from '../../models';

import * as moment from 'moment';
import { CookieService } from 'ngx-cookie';
import { CommentService } from '../../services/comment.service';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { Subject, forkJoin, Observable } from 'rxjs';
import { AuthModal } from '../auth/auth.modal';
import { FeedLikeService } from '../../services/feed-like.service';
import { FeedService } from '../../../pages/main/feed/feed.service';
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
        private _feedLikeService: FeedLikeService
    ) {
        this.feedItem = _data.data;
        this.localImage =this._data.localImage;
        this.timeStamp = moment(this.feedItem.timeStamp).fromNow();
        this.role = this._cookieService.get('role')


    }

    ngOnInit() {
        for (let item of this.feedItem.feed_media) {
            this.content =  item.content;
                if (typeof item.content == 'string') {
                    this.content = JSON.parse(item.content)
                }
            }
        
        this._showseeMore();
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
    public sendMessage($event, parent?: string) {
        if ($event) {
            this._commentService.createFeedComment(this.feedItem.id, $event, parent).pipe(
                takeUntil(this.unsubscribe$),
                switchMap(() => {
                    return this._combineObservable(parent)
                },
                )).subscribe()
        }
    }
    public sendMessageForParent($event, item) {
        this.sendMessage($event, item.url)
    }
    private _combineObservable(parent?) {
        const combine = forkJoin(
            this._getComments(parent),
            this._getFeedById()
        )
        return combine
    }
    public likeOrDislike(event) {
        if (event) {
            if (this.role) {
                let isChild: boolean;
                if (event.isChild) {
                    isChild = true
                }
                if (event.type == '0') {
                    this._commentService.dislikeComment(event.url).pipe(takeUntil(this.unsubscribe$),
                        switchMap(() => {
                            return this._getComments(isChild)
                        })).subscribe()
                } else {
                    if (event.type == '1') {
                        this._commentService.likeComment(event.url).pipe(takeUntil(this.unsubscribe$),
                            switchMap(() => {
                                return this._getComments(isChild)
                            })).subscribe()
                    }
                }
            } else {
                this.onClickOpenAuth()
            }

        }

    }

    public getButtonsType(event: string) {
        if (event) {
            if (this.role) {
                if (event == 'like') {
                    this._feedLikeService.likeFeed(this.feedItem.id).pipe(takeUntil(this.unsubscribe$),
                        switchMap((data) => {
                            return this._getFeedById()
                        })
                    ).subscribe()

                }
            } else {
                this.onClickOpenAuth()
            }
        }
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