import { Component, OnInit, Inject } from "@angular/core";
import { FeedService } from '../feed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, switchMap, map, finalize } from 'rxjs/operators';
import { Subject, forkJoin, Observable, of } from 'rxjs';
import { FeedResponseData, ServerResponse } from '../../../../core/models';
import { CookieService } from 'ngx-cookie';
import * as moment from 'moment';
import { CommentService } from '../../../../core/services/comment.service';
import { AuthModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../core/services/user.service';
import { Location } from '@angular/common';
import { FollowService } from '../../../../core/services/follow.service';
@Component({
    selector: "combination-view",
    templateUrl: "combination.view.html",
    styleUrls: ["combination.view.scss"]
})

export class CombinationView implements OnInit {
    private _userRole: string;
    private _user;
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
    public time:string;
    public slideConfig1;
    public arrays = [];
    constructor(private _feedService: FeedService, private _activatedRoute: ActivatedRoute,
        private _cookieService: CookieService,
        private _commentService: CommentService,
        private _matDialog: MatDialog,
        private _userService: UserService,
        private _location: Location,
        private _followService: FollowService,
        private _router:Router,
        @Inject("FILE_URL") public fileUrl: string) {
        this.role = this._cookieService.get('role');

        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this._articleId = params.id;
        })
    }

    ngOnInit() {
        this._initConfig()
        this._getArticleById().pipe(takeUntil(this.unsubscribe$)).subscribe();
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
        return this._feedService.getFeedById(this._articleId).pipe(
            finalize(() => { this.loading = false }),
            map((data: FeedResponseData) => {
                this.article = data;
                if (this.article) {
                    this._userRole = this.article.creator_client_info ? 'client' : 'coach';
                    this._user = this._userRole == 'client' ? this.article.creator_client_info : this.article.creator_info
                }
                this.time = moment(this.article.timeStamp).format('MMMM Do YYYY');
                if (this.article && this.article.feed_media && this.article.feed_media[0] && this.article.feed_media[0].content) {
                    this.content = JSON.parse(this.article.feed_media[0].content);
                    if (this.content.arrays)
                        this.arrays = this.content.arrays
                }
                return data
            })
        )
    }

    public likeOrDislike(event) {
        if (event) {
            this._getComments(event.isChild).pipe(takeUntil(this.unsubscribe$)).subscribe()

        } else {
            this.onClickOpenAuth()
        }
    }
    public getButtonsType(event: string) {
        if (event) {
            this._getFeedById().pipe(takeUntil(this.unsubscribe$)).subscribe();
        } else {
            this.onClickOpenAuth()
        }
    }
 
    private _getFeedById(isComment?:boolean,parent?) {        
        return this._feedService.getFeedById(this.article.id).pipe(switchMap((result) => {
            this.article = result;
            if (isComment) {                
                return this._getComments(parent)
            } else {
                return of()
            }
        }))
    }
    public sendMessage(event) {
        if (event) {
            let parentUrl = event.parentUrl ? event.parentUrl : null;
            this._getFeedById(true,parentUrl).pipe(takeUntil(this.unsubscribe$)).subscribe()
        }
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
        return this._commentService.getFeedCommentById(this.article.id,+this.article.feed_comments_count,0).pipe(map((data: ServerResponse<Comment[]>) => {
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
        })
    }
    public setImage() {
        return this.content.cover ? this.fileUrl + this.content.cover : 'assets/images/chicken.png'
    }
    public follow() {
        if (this.role) {
            this._followService.follow(this._user, this.role, this._userService.user.data.url, this._userRole, this._user.url)
                .pipe(takeUntil(this.unsubscribe$),
                    switchMap((data) => {
                        return this._getArticleById()
                    })).subscribe()
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
    public onClickGoBack(): void {
        this._location.back();
    }

    public backToArticleById():void{
        this._router.navigate([`article/${this._articleId}`])
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    get user() {
        return this._user;
    }
}