import { Component, OnInit, Inject } from "@angular/core";
import { FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap, map, finalize } from 'rxjs/operators';
import { Subject, forkJoin, Observable, Subscription } from 'rxjs';
import { FeedResponseData, ServerResponse } from '../../../../core/models';
import { CookieService } from 'ngx-cookie';
import * as moment from 'moment';
import { CommentService } from '../../../../core/services/comment.service';
import { AuthModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { FeedLikeService } from '../../../../core/services/feed-like.service';
import { FollowCommentService } from '../../../../core/services/follow-comment.service';

@Component({
    selector: "combination-view",
    templateUrl: "combination.view.html",
    styleUrls: ["combination.view.scss"]
})

export class CombinationView implements OnInit {
    public loading: boolean = false;
    public showDeleteModal: boolean = false;
    public isShowSubMessages: boolean = false;
    public isOpen: boolean = false;
    public articleId: number;
    private unsubscribe$ = new Subject<void>()
    public comments = [];
    public article: FeedResponseData;
    public content;
    public role: string;
    public time;
    public slideConfig1;
    private _subscription: Subscription;
    constructor(private _feedService: FeedService, private _activatedRoute: ActivatedRoute,
        private _cookieService: CookieService,
        private _commentService: CommentService,
        private _feedLikeService: FeedLikeService,
        private _matDialog: MatDialog,
        private _followCommentService: FollowCommentService,
        @Inject("FILE_URL") public fileUrl: string) {
        this.role = this._cookieService.get('role');

        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this.articleId = params.id;
        })
    }

    ngOnInit() {
        this._initConfig()
        this._getArticleById();
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
                            return this._getComments(data.isParent)
                        }
                    } else {
                        this.onClickOpenAuth()
                    }
                }
            })
        ).subscribe()
    }
    private _initConfig() {
        this.slideConfig1 = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000
        }

    }
    private _getArticleById() {
        this.loading = true
        this._feedService.getFeedById(this.articleId).pipe(takeUntil(this.unsubscribe$),
            finalize(() => { this.loading = false })).subscribe((data: FeedResponseData) => {
                this.article = data;
                this.time = moment(this.article.timeStamp).format('MMMM Do YYYY');
                if (this.article && this.article.feed_media && this.article.feed_media[0] && this.article.feed_media[0].content) {
                    this.content = JSON.parse(this.article.feed_media[0].content);
                }
            })
    }


    private _checkIsLike() {
        this._followCommentService.getLikeState().pipe(
            takeUntil(this.unsubscribe$),
            switchMap((data: any) => {
                if (data.isSend) {
                    if (data.isAuthorizated) {
                        return this._getFeedById()

                    } else {
                        this.onClickOpenAuth()
                    }
                }
            })
        ).subscribe()
    }
    private _getFeedById() {
        return this._feedService.getFeedById(this.article.id).pipe(map((result) => {
            this.article = result;
            return result
        }))
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
        return this._commentService.getFeedCommentById(this.article.id).pipe(map((data: ServerResponse<Comment[]>) => {
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
    public setImage() {
        return this.content.cover ? this.fileUrl + this.content.cover : 'assets/images/chicken.png'
    }
    ngOnDestroy() {

        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}