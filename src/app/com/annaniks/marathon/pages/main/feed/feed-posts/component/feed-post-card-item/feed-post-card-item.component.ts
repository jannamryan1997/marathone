import { Component, OnInit, Input, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PropertyModal, AuthModal } from 'src/app/com/annaniks/marathon/core/modals';
import { FeedResponseData, ServerResponse } from 'src/app/com/annaniks/marathon/core/models';
import * as moment from 'moment'
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/com/annaniks/marathon/core/services/user.service';
import { FeedService } from '../../../feed.service';
import { ReceiptResponseData } from 'src/app/com/annaniks/marathon/core/models/receipt';
import { FormBuilder } from '@angular/forms';
import { FeedLikeService } from 'src/app/com/annaniks/marathon/core/services/feed-like.service';
import { Subject, forkJoin, Observable } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { CommentService } from 'src/app/com/annaniks/marathon/core/services/comment.service';

@Component({
    selector: "app-feed-post-card-item",
    templateUrl: "feed-post-card-item.component.html",
    styleUrls: ["feed-post-card-item.component.scss"]
})

export class FeedPostCardItemComponent implements OnInit {
    private unsubscribe$ = new Subject<void>()
    @Input() feedItem: FeedResponseData;
    @Input() routerLink: string;
    @Output() deletedItem = new EventEmitter<any>();
    public showTitle: boolean = false;
    public isOpen: boolean = false;
    public content;
    public time: string;
    public seeMore: boolean = false;
    public role: string;
    public feedTitle: string;
    public videoSources = [];
    public receptvideoSources = [];
    public receipt: ReceiptResponseData;
    public localImage: string = "/assets/images/user-icon-image.png";
    public showDeleteModal: boolean = false;
    public slideConfig = {};
    public comments: Comment[] = []
    public isShowSubMessages: boolean = false;
    constructor(
        @Inject("FILE_URL") public fileUrl,
        private _matDialog: MatDialog,
        private _fb: FormBuilder,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _feedLikeService: FeedLikeService,
        private _feedService: FeedService,
        private _commentService: CommentService) {
        this.role = this._cookieService.get('role');
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
        console.log(this.feedItem);
        
        this.time = moment(this.feedItem.timeStamp).fromNow();
        if (this.feedItem.feed_media && this.feedItem.feed_media.length) {
            this.content = this.feedItem.feed_media[0].content;
            this.receipt = this.content.receipt;
        }

        if (this.content.type === "videoLink") {
            this.videoSources = [{
                src: this.content.url,
                provider: 'youtube',
            }]
        }
        if (this.content.type === "recipeType") {
            this.receptvideoSources = [{
                src: this.receipt.videoLink,
                provider: 'youtube',
            }]
        }

        if (!this.role) {
            if (this.feedItem.creator_info && this.feedItem.creator_info.avatar) {
                this.localImage = this.fileUrl + this.feedItem.creator_info.avatar;
            }

            else if (this.feedItem.creator_client_info && this.feedItem.creator_client_info.avatar) {
                this.localImage = this.fileUrl + this.feedItem.creator_client_info.avatar;
            }
            else {
                this.localImage = '/assets/images/user-icon-image.png';
            }
        }

        else if (this.role && this._userService.user && this._userService.user.data && this._userService.user.data.avatar) {
            this.localImage = this.fileUrl + this._userService.user.data.avatar;
        }
        else if (this.role && (!this._userService.user || (this._userService.user && !this._userService.user.data) || this._userService.user.data.avatar === null)) {
            this.localImage = "/assets/images/user-icon-image.png";
        }
        this._showseeMore();
        
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

    public onClickSeeMore(): void {
        this.feedTitle = this.feedItem.title.slice(0, this.feedItem.title.length);
        this.seeMore = false;
    }

    public openPropertyModalByImage(): void {
        const dialogRef = this._matDialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "100vw",
            height: "100vh",
            data: {
                data: this.feedItem,
                localImage: this.localImage
            }
        })
        dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$),
            switchMap(() => {
                return this._getFeedById()
            })
        ).subscribe()
    }

    public openPropertyModalByVideo(): void {
        const dialogRef = this._matDialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "100vw",
            height: "100vh",
            data: {
                data: this.feedItem,
                localImage: this.localImage
            }
        })
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
    public setImage() {
        return this.content.cover ? this.fileUrl + this.content.cover : 'assets/images/chicken.png'
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
    public showDeletedModal(): void {
        this.showDeleteModal = !this.showDeleteModal;
    }

    public deleteFeedItem(event) {
        if (event) {
            this.showDeleteModal=false;
         this.deletedItem.emit(this.feedItem.id);
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    public onClickedOutside(event): void {
        this.showDeleteModal = false;
        
    }

}


