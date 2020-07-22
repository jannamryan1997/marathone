import { Component, OnInit, Inject } from "@angular/core";
import { FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap, map, finalize } from 'rxjs/operators';
import { Subject, forkJoin, Observable } from 'rxjs';
import { FeedResponseData, ServerResponse } from '../../../../core/models';
import { CookieService } from 'ngx-cookie';
import * as moment from 'moment';
import { CommentService } from '../../../../core/services/comment.service';
import { AuthModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { FeedLikeService } from '../../../../core/services/feed-like.service';

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
    private _articleId: number;
    private unsubscribe$ = new Subject<void>()
    public comments = [];
    public article: FeedResponseData;
    public content;
    public role: string;
    public time;
    public slideConfig1;
    public arrays = []
    constructor(private _feedService: FeedService, private _activatedRoute: ActivatedRoute,
        private _cookieService: CookieService,
        private _commentService: CommentService,
        private _feedLikeService: FeedLikeService,
        private _matDialog: MatDialog,
        @Inject("FILE_URL") public fileUrl: string) {
        this.role = this._cookieService.get('role');

        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this._articleId = params.id;
        })
    }

    ngOnInit() {
        this._initConfig()
        this._getArticleById();
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
        this._feedService.getFeedById(this._articleId).pipe(takeUntil(this.unsubscribe$),
            finalize(() => { this.loading = false })).subscribe((data: FeedResponseData) => {
                this.article = data;
                this.time = moment(this.article.timeStamp).format('MMMM Do YYYY');
                if (this.article && this.article.feed_media && this.article.feed_media[0] && this.article.feed_media[0].content) {
                    this.content = JSON.parse(this.article.feed_media[0].content);
                    if (this.content.arrays)
                        this.arrays = this.content.arrays
                    // console.log(this.content);

                }
            })
    }

    public likeOrDislike(event) {
        if (event) {
            if (this.role) {
                let isChild: boolean;
                if (event.isChild) {
                    isChild = true
                }
                if (event.type == '0') {
                    this.loading = true;
                    this._commentService.dislikeComment(event.url).pipe(takeUntil(this.unsubscribe$),
                        finalize(() => { this.loading = false }),
                        switchMap(() => {
                            return this._getComments(isChild)
                        })).subscribe()
                } else {
                    if (event.type == '1') {
                        this.loading = true;
                        this._commentService.likeComment(event.url).pipe(takeUntil(this.unsubscribe$),
                            finalize(() => { this.loading = false }),
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
                    this.loading = true;
                    this._feedLikeService.likeFeed(this.article.id).pipe(takeUntil(this.unsubscribe$),
                        finalize(() => { this.loading = false }),
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
    private _getFeedById() {
        return this._feedService.getFeedById(this.article.id).pipe(map((result) => {
            this.article = result;
            return result
        }))
    }
    public sendMessage($event, parent?: string) {
        if ($event) {
            this.loading = true;
            this._commentService.createFeedComment(this.article.id, $event, parent).pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => { this.loading = false }),
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