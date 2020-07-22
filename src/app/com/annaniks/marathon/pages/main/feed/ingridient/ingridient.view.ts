import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FeedService } from '../feed.service';
import { CookieService } from 'ngx-cookie';
import { FeedResponseData, ServerResponse } from '../../../../core/models';

import * as moment from 'moment';
import { ReceiptResponseData } from '../../../../core/models/receipt';

import { Location } from '@angular/common';
import { AuthModal } from '../../../../core/modals';
import { Subject, Observable, forkJoin, of } from 'rxjs';
import { switchMap, takeUntil, map, finalize } from 'rxjs/operators';
import { CommentService } from '../../../../core/services/comment.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedLikeService } from '../../../../core/services/feed-like.service';
import { FollowCommentService } from '../../../../core/services/follow-comment.service';

@Component({
    selector: "ingridient-view",
    templateUrl: "ingridient.view.html",
    styleUrls: ["ingridient.view.scss"]
})

export class IngridientViewComponent implements OnInit {
    public feedItem: FeedResponseData;
    public feedId: number;
    public role: string;
    private unsubscribe$ = new Subject<void>()

    public isOpen: boolean = false;
    public receptvideoSources = [];
    public time: string;
    public receipt: ReceiptResponseData;
    public loading: boolean = false;
    public slideConfig = {};
    public showDeleteModal: boolean = false;
    public isShowSubMessages: boolean = false
    public comments = [];
    constructor(
        private _followCommentService: FollowCommentService,
        private _activatedRoute: ActivatedRoute,
        private _feedService: FeedService,
        private _cookieService: CookieService,
        private _location: Location,
        private _commentService: CommentService,
        private _matDialog: MatDialog,
        private _feedLikeService: FeedLikeService
    ) {
        this._activatedRoute.params.subscribe((params) => {
            this.feedId = Number(params.id);
            this.role = this._cookieService.get('role');
        })
        this.slideConfig = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000
        }
    }

    ngOnInit() {
        this._getFeedById().pipe(takeUntil(this.unsubscribe$)).subscribe();
        this._checkIsGetComment();
        this._checkIsLike()
    }


    private _getFeedById() {
        this.loading = true;
        return this._feedService.getFeedById(this.feedId).pipe(
            finalize(() => { this.loading = false; }),
            map((data: FeedResponseData) => {
                this.feedItem = data;

                this.time = moment(this.feedItem.timeStamp).format('MMMM Do YYYY');
                for (let item of data.feed_media) {
                    if (typeof item.content === 'string') {
                        const content = JSON.parse(item.content);
                        item.content = content;
                        if (content && content.receipt) {
                            this.receipt = content.receipt;
                            this.receptvideoSources = [{
                                src: this.receipt.videoLink,
                                provider: 'youtube',
                            }]
                        }
                    }
                }
                return data
            })
        )
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
                        this.onClickOpenAuth();
                        return of()
                    }
                } else {
                    return of()
                }
            })
        ).subscribe()
    }
    private _combineObservable(parent?) {
        const combine = forkJoin(
            this._getComments(parent),
            this._getFeedById()
        )
        return combine
    }

    public onClickOpen($event): void {
        this.isOpen = $event;
        if (this.isOpen) {
            this.loading = true;
            this._getComments().pipe(takeUntil(this.unsubscribe$),
                finalize(() => { this.loading = false })).subscribe()
        }
    }
    private _getComments(parent?): Observable<ServerResponse<Comment[]>> {
        return this._commentService.getFeedCommentById(this.feedItem.id).pipe(map((data: ServerResponse<Comment[]>) => {
            this.comments = data.results;
            this.isShowSubMessages = parent ? true : false;
            return data
        }))
    }
    public showDeletedModal(): void {
        this.showDeleteModal = !this.showDeleteModal;
    }
    public onClickOpenAuth(): void {
        this._matDialog.open(AuthModal, {
            width: "100%",
            maxWidth: "100vw",
        })
    }



    public onClickGotoBack() {
        this._location.back();
    }
    ngOndestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}