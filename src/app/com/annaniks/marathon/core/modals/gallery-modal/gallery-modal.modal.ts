import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserData } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable, Subject, forkJoin } from 'rxjs';
import { ServerResponse } from '../../../core/models/server-response';
import { map, takeUntil } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';
import { CookieService } from 'ngx-cookie';
import { FeedService } from '../../../pages/main/feed/feed.service';
import { AuthModal } from '../auth/auth.modal';


@Component({
    selector: "app-gallery-modal",
    templateUrl: "gallery-modal.modal.html",
    styleUrls: ["gallery-modal.modal.scss"]
})

export class GalleryModal implements OnInit, OnDestroy {
    public type: string;
    public mediaItem = [];
    public slideConfig = {};
    public videoSources = [];
    public user: UserData;
    public localImage: string;
    public feedItem;
    public comments = [];
    public isOpen: boolean = true;
    public role: string;
    private unsubscribe$ = new Subject<void>();
    private _defaultImage: string = '/assets/images/user-icon-image.png';
    private _isChange: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data,
        @Inject('FILE_URL') public fileURL,
        private _commentService: CommentService,
        private _cookieService: CookieService,
        private _feedService: FeedService,
        private _matDialog: MatDialog,
        private _dialogRef: MatDialogRef<GalleryModal>,
    ) {
        this.role = this._cookieService.get('role');
        if (this._data && this._data.type) {
            this.type = this._data.type;
        }
        if (this._data && this._data.data) {
            this.feedItem = this._data.data;
            this.user = this.feedItem ? this.feedItem.creator_client_info ? this.feedItem.creator_client_info :
                this.feedItem.creator_info ? this.feedItem.creator_info : null : null
        }

        if (this.feedItem) {
            this.mediaItem.push(this.feedItem.feed_media[0].content);
            this.videoSources = [{
                src: this.mediaItem[0].url,
                provider: 'youtube',
            }]
        }
        // this._userService.user.data;
        if (this.user) {
            this.localImage = this.user.avatar ? this.fileURL + this.user.avatar : this._defaultImage;
        }

    }

    ngOnInit() {
        this._getComments();
    }


    private _getFeedById() {
        return this._feedService.getFeedById(this.feedItem.id).pipe(map((result) => {
            this.feedItem = result;
            return result
        }))
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

    private _combineObservable(parent?) {
        const combine = forkJoin(
            this._getComments(parent),
            this._getFeedById()
        )
        return combine
    }

    public sendMessage(event) {

        if (event) {
            let parentUrl = event.parentUrl ? event.parentUrl : null;
            this._isChange = true;
            this._combineObservable(parentUrl).pipe(takeUntil(this.unsubscribe$)).subscribe()
        }
    }
    public onClickOpen($event): void {
        this.isOpen = $event;
        this._getComments().pipe(takeUntil(this.unsubscribe$)).subscribe()
    }

    public getButtonsType(event: string) {
        if (event) {
            this._isChange = true;
            this._getFeedById().pipe(takeUntil(this.unsubscribe$)).subscribe();
        }
        else {
            this._dialogRef.close();
            this.onClickOpenAuth();

        }
    }

    public onClickOpenAuth(): void {
        this._matDialog.open(AuthModal, {
        })
    }
    public likeOrDislike(event) {
        if (event) {
            this._isChange = true;
            this._getComments(event.isChild).pipe(takeUntil(this.unsubscribe$)).subscribe()

        }
    }

    ngOnDestroy() { }

} 