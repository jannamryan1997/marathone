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
    private unsubscribe$ = new Subject<void>();
    public show: boolean = false;
    public isOpen: boolean = true;
    public seeMore: boolean = false;
    public timeStamp: string;
    public content: any;
    public feedItem: FeedResponseData;
    public feedTitle: string;
    public role: string;
    public localImage: string;
    public comments = [];
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
        if(  this.feedItem){
            this.timeStamp = moment(this.feedItem.timeStamp).fromNow();
        }
       
        this.role = this._cookieService.get('role')


    }

    ngOnInit() {
        this._getComments().pipe(takeUntil(this.unsubscribe$)).subscribe()
        console.log(this.comments);
        
        if( this.feedItem ){
        for (let item of this.feedItem.feed_media) {
            this.content =  item.content;
                if (typeof item.content == 'string') {
                    this.content = JSON.parse(item.content)
                }
            }
            this._showseeMore();
        }
      
    }
    get userRole() {
        let role = this.feedItem.creator_client_info ? 'client' : 'coach';
        return role
    }

    private _showseeMore(): void {
        let titleLength: number;
        if (this.feedItem.title) {
            titleLength = this.feedItem.title.length;
            this.feedTitle = this.feedItem.title;
            if (titleLength > 100) {
                this.seeMore = true;
                this.feedTitle = this.feedItem.title.slice(0, 90);
            }
            else {
                this.seeMore = false;
            }
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

    public likeOrDislike(event) {
        if (event) {
            this._getComments(event.isChild).pipe(takeUntil(this.unsubscribe$)).subscribe()          

        }else{
            this.onClickOpenAuth()
        }
    }

    public getButtonsType(event: string) {
        if (event) {
            this._getFeedById().pipe(takeUntil(this.unsubscribe$)).subscribe();           
        }else{
            this.onClickOpenAuth()  
        }
    }
    public onClickOpenAuth(): void {
        this._matDialog.open(AuthModal, {
            // width: "100%",
            // maxWidth: "100vw",
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

    public closeModal(): void {
        this._dialogRef.close();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}