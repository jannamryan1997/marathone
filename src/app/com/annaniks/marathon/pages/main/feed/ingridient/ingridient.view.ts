import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from '../feed.service';
import { CookieService } from 'ngx-cookie';
import { FeedResponseData, ServerResponse } from '../../../../core/models';

import * as moment from 'moment';
import { ReceiptResponseData } from '../../../../core/models/receipt';

import { Location, ViewportScroller } from '@angular/common';
import { AuthModal } from '../../../../core/modals';
import { Subject, Observable, forkJoin } from 'rxjs';
import { switchMap, takeUntil, map, finalize } from 'rxjs/operators';
import { CommentService } from '../../../../core/services/comment.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedLikeService } from '../../../../core/services/feed-like.service';
import { ProfileService } from '../../../../core/services/profile.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: "ingridient-view",
    templateUrl: "ingridient.view.html",
    styleUrls: ["ingridient.view.scss"]
})

export class IngridientViewComponent implements OnInit {
    private _userRole: string;
    private _user;
    private unsubscribe$ = new Subject<void>();
    public feedItem: FeedResponseData;
    public feedId: number;
    public role: string;
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
        private _activatedRoute: ActivatedRoute,
        private _feedService: FeedService,
        private _cookieService: CookieService,
        private _commentService: CommentService,
        private _matDialog: MatDialog,
        private _profileService: ProfileService,
        private _userService: UserService,
        private _location:Location,
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
    }


    private _getFeedById() {
        this.loading = true;
        return this._feedService.getFeedById(this.feedId).pipe(
            finalize(() => { this.loading = false; }),
            map((data: FeedResponseData) => {
                this.feedItem = data;
                if (this.feedItem) {
                    this._userRole = this.feedItem.creator_client_info ? 'client' : 'coach';
                    this._user = this._userRole == 'client' ? this.feedItem.creator_client_info : this.feedItem.creator_info
                }
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

    public getButtonsType(event: string) {
        if (event) {
            this._getFeedById().pipe(takeUntil(this.unsubscribe$)).subscribe();
        } else {
            this.onClickOpenAuth()
        }
    }


    public likeOrDislike(event) {
        if (event) {
            this._getComments(event.isChild).pipe(takeUntil(this.unsubscribe$)).subscribe()
        } else {
            this.onClickOpenAuth()
        }
    }
    public sendMessage(event) {
        if (event) {
            let parentUrl = event.parentUrl ? event.parentUrl : null;
            this._combineObservable(parentUrl).pipe(takeUntil(this.unsubscribe$)).subscribe()
        }
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
            if (parent) {
                this.comments = this.comments.map((val) => {
                    if (val.url == parent) {
                        val.isShowSubMessages = true
                    }
                    return val
                })
            }
            return data;
        }))
    }
    public showDeletedModal(): void {
        this.showDeleteModal = !this.showDeleteModal;
    }
    public onClickOpenAuth(): void {
        this._matDialog.open(AuthModal, {
            // width: "100%",
            // maxWidth: "100vw",
        })
    }
    public follow() {
        if (this.role) {
            if (!this._user.is_follower) {
                this._profileService.follow(this.role, this._userService.user.data.url, this._userRole, this._user.url).pipe(takeUntil(this.unsubscribe$)).pipe(
                    switchMap(() => {
                        return this._getFeedById()
                    })).subscribe();
            } else {
                if (this._user.is_follower_id) {
                    this._profileService.unfollow(this._user.is_follower_id).pipe(takeUntil(this.unsubscribe$)).pipe(
                        switchMap(() => {
                            return this._getFeedById()
                        })).subscribe();
                }
            }
        } else {
            this.onClickOpenAuth()
        }
    }
    public checkIsMe() {
        if (this._userService.user) {            
            return (!this._user || +this._user.id == +this._userService.user.data.id)
        } else {
            return false
        }
    }

    public onClickGotoBack() {
        this._location.back();
      

    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    get user() {
        return this._user
    }
}