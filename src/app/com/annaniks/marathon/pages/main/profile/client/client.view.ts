import { Component, OnInit } from "@angular/core";
import { UserResponseData } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';
import { FeedService } from '../../feed/feed.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { FeedResponseData, FeedData } from '../../../../core/models';
import { RemoveModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProfileService } from '../../../../core/services/profile.service';

@Component({
    selector: "app-client",
    templateUrl: "client.view.html",
    styleUrls: ["client.view.scss"]
})

export class ClientView implements OnInit {
    public a: string;
    public feedItem: FeedResponseData[] = [];
    public user: any;
    public tab: number = 1;
    public galerryTab: number = 1;
    public postTab: number = 1;
    public loading: boolean = false;
    public throttle = 300;
    public reviewItem = [{}, {}, {}, {}, {}];
    public scrollDistance = 1;
    public scrollUpDistance = 2;
    public infiniteScrollDisabled = false;
    private _pageIndex = 1
    private _isCountCalculated = false;
    private _pagesCount: number;
    public userId: number;
    private unsubscribe$ = new Subject<void>()
    public userStatus: string;
    public seeMore: boolean = false;


    constructor(
        private _profileUserService: UserService,
        private _feedService: FeedService,
        private _dialog: MatDialog,
        private _router: Router,
        private _userService: UserService,
        private _profileService: ProfileService,
        private _activatedRoute: ActivatedRoute) {
        let urls = this._router.url.split('/');
        if (urls && urls.length && urls.length == 4) {
            this.userId = +urls[urls.length - 2];
        }
        if (!this.userId) {
            this.userId = this._userService.user.data.id;            
        }
        this.user = this.userId ? null : this._profileUserService.user;
    }

    ngOnInit() {
        this._getFeed(this._pageIndex);
        this._getProfile()
    }
    private _getProfile() {
        if (this.checkIsMe()) {
            this.user = this._userService.user.data;
            this._showseeMore();
        } else {
            this._profileService.getProfile('client', this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                this.user = data;
                this._showseeMore();
            })
        }
    }
    public checkIsMe() {
        if (this._userService.user) {
            return (!this.userId || +this.userId == +this._userService.user.data.id)
        } else {
            return false
        }
    }
    private _getFeed(page: number) {
        this.loading = true;
        let isAll=this.checkIsMe()?'':'true'
        this._profileService.getFeedByProfileId('creator_client', this.userId,isAll).pipe(finalize(() => { this.loading = false }))
        .subscribe((data:FeedData) => {
            this.feedItem = data.results;
            for (let item of this.feedItem) {
                for (let media of item.feed_media) {
                    if (typeof media.content == 'string') {
                        media.content = JSON.parse(media.content)
                    }
                }
            }
        })
    }
    private _showseeMore(): void {
        let titleLength: number;
        if (this.user.status) {
            titleLength = this.user.status.length;
            this.userStatus = this.user.status;
            if (titleLength > 280) {
                this.seeMore = true;
                this.userStatus = this.user.status.slice(0, 280);
            }
            else {
                this.seeMore = false;
            }
        }
    }

    public onClickSeeMore(): void {
        this.userStatus = this.user.status.slice(0, this.user.status.length);
        this.seeMore = false;
        
    }


    public onClickTab(tab): void {
        this.tab = tab;

    }
    public onClickGalerryTab(tab): void {

        this.galerryTab = tab;
    }

    public onClickPostEventsTab(postTab): void {
        this.postTab = postTab;
    }

    // public async onScroll() {
    //     if (this._pageIndex > this._pagesCount) {
    //         return;
    //     }
    //     this._getFeed(this._pageIndex);
    // }


    public deletedFeedItem(event): void {
        if (event) {
            const dialogRef = this._dialog.open(RemoveModal, {
                width: "400px"
            })
            dialogRef.afterClosed().subscribe((data) => {
                if (data === "deleted") {
                    this._feedService.deleteFeed(event).subscribe((data) => {
                        this._pageIndex = 1;
                        this._isCountCalculated = false;
                        this._pagesCount = 0;
                        this.feedItem = [];
                        this._getFeed(this._pageIndex)
                    })
                }

            })
        }

    }

    public onPostCreated(event): void {
        console.log('kkkkk');
        
        this._pageIndex = 1;
        this._isCountCalculated = false;
        this._pagesCount = 0;
        this.feedItem = [];
        this._getFeed(this._pageIndex);

    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    get email(): string {
        if (this.user)
            return !this.checkIsMe() ? this.user.user.email : this.user.user.email
    }
    get firstName(): string {
        if (this.user)
            return !this.checkIsMe() ? this.user.user.first_name : this.user.user.first_name
    }
}