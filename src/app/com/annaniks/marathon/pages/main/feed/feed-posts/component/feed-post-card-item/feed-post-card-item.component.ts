import { Component, OnInit, Input, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PropertyModal, AuthModal, LikeModal } from 'src/app/com/annaniks/marathon/core/modals';
import { FeedResponseData, ServerResponse, Comment } from 'src/app/com/annaniks/marathon/core/models';
import * as moment from 'moment'
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/com/annaniks/marathon/core/services/user.service';
import { FeedService } from '../../../feed.service';
import { ReceiptResponseData } from 'src/app/com/annaniks/marathon/core/models/receipt';
import { Subject, forkJoin, Observable } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { CommentService } from 'src/app/com/annaniks/marathon/core/services/comment.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-feed-post-card-item",
    templateUrl: "feed-post-card-item.component.html",
    styleUrls: ["feed-post-card-item.component.scss"]
})

export class FeedPostCardItemComponent implements OnInit {
    public user_name: string;
    private _isOpenModalMode: boolean = false;
    public videoLink;
    private unsubscribe$ = new Subject<void>();
    public feedItem: FeedResponseData;
    @Input('feedItem') set setFeedItem($event) {
        this.feedItem = $event;
    }

    @Input() routerLink: string;
    @Output() deletedItem = new EventEmitter<any>();
    @Output() editFeed = new EventEmitter<any>();
    @Input() style: boolean;
    @Input() mode = 'skeleton' || 'normal'
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
    public user;
    public scrollY;
    constructor(
        @Inject("FILE_URL") public fileUrl,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _feedService: FeedService,
        private _commentService: CommentService,
        private _dialog: MatDialog,
        private _router: Router,
    ) {
        this.role = this._cookieService.get('role');
        this.slideConfig = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000
        }
        this.user = this._userService.user;
    }

    ngOnInit() {

        if (this.mode == 'skeleton') return
        this.time = moment(this.feedItem.timeStamp).fromNow();
        if (this.feedItem.feed_media && this.feedItem.feed_media.length) {
            this.content = this.feedItem.feed_media[0].content;
            if (this.content && this.content.receipt)
                this.receipt = this.content.receipt;
        }
        if (this.content) {

            /////////////////////////


            if (this.content.type === "videoLink") {

                this.videoSources = [{
                    src: this.content.videoTitle,
                    provider: 'youtube',
                }]
            }

            ///////////////////////////////////

            if (this.content.type === "recipeType") {
                this.receptvideoSources = [{
                    src: this.receipt.videoLink,
                    provider: 'youtube',
                }]
            }
        }
        let role = this.userRole;
        if (role == 'client' && this.feedItem.creator_client_info && this.feedItem.creator_client_info.avatar) {
            this.localImage = this.fileUrl + this.feedItem.creator_client_info.avatar;
        } else {
            if (role == 'coach' && this.feedItem.creator_info && this.feedItem.creator_info.avatar) {
                this.localImage = this.fileUrl + this.feedItem.creator_info.avatar;
            }
        }
        if (this.userRole === 'coach' && this.feedItem.creator_info && this.feedItem.creator_info.slug) {
            if (this.feedItem.creator_info.slug.match(/\d+/g)) {
                this.user_name = this.feedItem.creator_info.user.first_name;
            }
            else {
                this.user_name = this.feedItem.creator_info.slug;
            }

        }
        if (this.userRole === 'client' && this.feedItem.creator_client_info && this.feedItem.creator_client_info.slug) {
            if (this.feedItem.creator_client_info.slug.match(/\d+/g)) {
                this.user_name = this.feedItem.creator_client_info.user.first_name;
            }
            else {
                this.user_name = this.feedItem.creator_client_info.slug;
            }
        }
        this._showseeMore();
    }


    private _getComments(parent?: string): Observable<ServerResponse<Comment[]>> {
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

    private _showseeMore(): void {
        let titleLength: number;
        if (this.feedItem.title) {
            titleLength = this.feedItem.title.length;
            this.feedTitle = this.feedItem.title;
            if (titleLength > 210) {
                this.seeMore = true;
                this.feedTitle = this.feedItem.title.slice(0, 210);
            }
            else {
                this.seeMore = false;
            }
        }
    }

    private _getFeedById(message) {
        return this._feedService.getFeedById(this.feedItem.id).pipe(map((result) => {
            if (result && result.feed_media && result.feed_media[0] && result.feed_media[0].content) {
                this.content = JSON.parse(result.feed_media[0].content)
            }
            this.feedItem = result;
            this.showDeleteModal = false;
            if (message = ! 'setting') {
                if (this.content && this.content.url) {
                    this.videoSources = [{
                        src: this.content.url,
                        provider: 'youtube',
                    }]
                }
            }

            return result;
        }))
    }

    public likeOrDislike(event) {
        if (event) {
            this._getComments(event.isChild).pipe(takeUntil(this.unsubscribe$)).subscribe()

        } else {
            this.onClickOpenAuth()
        }
    }



    public onClickSeeMore(): void {
        this.feedTitle = this.feedItem.title.slice(0, this.feedItem.title.length);
        this.seeMore = false;
    }

    public openPropertyModalByImage(): void {
        const dialogRef = this._dialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "1400px",
            data: {
                data: this.feedItem,
                localImage: this.localImage
            }

        });

        dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$),
            switchMap(() => {
                return this._getFeedById(event)
            })
        ).subscribe()
    }

    public openPropertyModalByVideo(): void {
        const dialogRef = this._dialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "1400px",
            data: {
                data: this.feedItem,
                localImage: this.localImage
            }
        })
    }
    public getButtonsType(event: string, message = 'setting') {

        if (event) {
            this._getFeedById(message).pipe(takeUntil(this.unsubscribe$)).subscribe();
        } else {
            this.onClickOpenAuth()
        }
    }
    public onClickOpenAuth(): void {
        this._dialog.open(AuthModal, {
        })
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
            this._getFeedById(event)
        )
        return combine;
    }
    public setImage() {
        return this.content && this.content.cover ? this.fileUrl + this.content.cover : 'assets/images/chicken.png'
    }
    public onClickOpen($event): void {
        this.isOpen = $event;
        this._getComments().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public showDeletedModal(): void {
        if (this.role) {
            this.showDeleteModal = !this.showDeleteModal;
        }
        else {
            const dialofRef = this._dialog.open(AuthModal, {
                // width: "100%",
                // maxWidth: "100vw",
            })
        }

    }

    public deleteFeedItem(event) {
        if (event) {
            this.showDeleteModal = false;
            this.deletedItem.emit(this.feedItem.id);
        }
    }

    public onClickedOutside(): void {        
        if (!this._isOpenModalMode)
            this.showDeleteModal = false;
    }
    public isOpenModal($event) {
        this._isOpenModalMode = $event;
        if (!this._isOpenModalMode) {
            this.showDeleteModal = false;
        }
    }
    public getProfleUrl() {
        let role = this.feedItem.creator_client_info ? 'client' : 'coach';
        let userSlug = this.feedItem.creator_info ? this.feedItem.creator_info.slug : this.feedItem.creator_client_info.slug;
        return `/profile/${userSlug}/${role}`;
    }



    public onClickeditFeedItem(event): void {
        if (event) {
            this.showDeleteModal = false;
            this._getFeedById(event).subscribe()
        }
    }
    public showLikeModal(event): void {

        if (event && this.role) {
            const dialogRef = this._dialog.open(LikeModal, {
                width: "450px",
                data: {
                    data: this.feedItem.id,
                }
            })
        }
    }


    public routerIngridientPage(): void {
        this.scrollY = window.scrollY;
        this._router.navigate([`/feed/ingridient/${this.feedItem.id}`]);

    }

    get userRole() {
        let role = this.feedItem.creator_client_info ? 'client' : 'coach';
        return role
    }
    get checkIsMe() {
        let keyName: string;
        if (this.role) {
            if (this.role == 'coach') {
                keyName = 'creator_info'
            } else {
                keyName = 'creator_client_info'
            }
            if (this.feedItem[keyName] && +this.feedItem[keyName].id == +this.user.data.id) {
                return true
            }
        } else {
            return false
        }
    }


    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}


