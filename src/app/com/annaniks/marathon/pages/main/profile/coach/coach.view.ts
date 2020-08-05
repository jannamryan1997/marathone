import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../../core/services/user.service';
import { FeedService } from '../../feed/feed.service';
import { FeedResponseData, FeedData } from '../../../../core/models';
import { finalize, takeUntil } from 'rxjs/operators';
import { RemoveModal, GalleryModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile.service';
import { CountryService } from '../../../../core/services/country.service';

@Component({
    selector: "app-coach",
    templateUrl: "coach.view.html",
    styleUrls: ["coach.view.scss"]
})

export class CoachView implements OnInit {
    public feedItem: FeedResponseData[] = [];
    public user: any;
    public tab: number = 1;
    public postTab: number = 1;
    public galerryTab: number = 1;
    public loading: boolean = false;
    public reviewItem = [{}, {}, {}, {}, {}];
    public scrollDistance = 1;
    public scrollUpDistance = 2;
    public infiniteScrollDisabled = false;
    private _pageIndex = 1
    private _isCountCalculated = false;
    private _pagesCount: number;
    public throttle = 300;
    public seeMore: boolean = false;
    public userStatus: string;
    private unsubscribe$ = new Subject<void>()
    public userId: number;
    public languageName = [];
    public mediaItem = [];
    constructor(
        private _userService: UserService,
        private _feedService: FeedService,
        private _dialog: MatDialog,
        private _profileService: ProfileService,
        private _countryService: CountryService,
        private _router: Router) {
        let urls = this._router.url.split('/');
        if (urls && urls.length && urls.length == 4) {
            this.userId = +urls[urls.length - 2];
        }
        if (!this.userId) {
            this.userId = this._userService.user.data.id;
        }
    }

    ngOnInit() {
        this._getFeed();
        this._getProfile();
        this._getLanguages();
    }

    private _getProfile() {

        if (this.checkIsMe()) {
            this.user = this._userService.user.data;
            this._showseeMore();
        } else {
            this._profileService.getProfile('coach', this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                this.user = data;
                this._showseeMore();
            })
        }
    }

    private _getFeed() {
        this.loading = true;
        let isAll = this.checkIsMe() ? 'me' : 'true'
        this._profileService.getFeedByProfileId('creator', this.userId, isAll).pipe(finalize(() => { this.loading = false }))
            .subscribe((data: FeedData) => {
                this.feedItem = data.results;
                for (let item of this.feedItem) {
                    for (let media of item.feed_media) {
                        if (typeof media.content == 'string') {
                            media.content = JSON.parse(media.content);
                            this.mediaItem.push(media.content);
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

    private _getLanguages(): void {
        let url: string;
        this._countryService.getLanguages().subscribe((data) => {
            data.results.map((name, index) => {
                url = name.url;
                this._userService.user.data.language.forEach(element => {
                    if (url === element) {
                        this.languageName.push({ name: name.name });
                    }
                })


            })
        })
    }

    public checkIsMe() {
        if (this._userService.user && this._userService.user.data) {
            return (!this.userId || (this.userId && +this.userId == +this._userService.user.data.id))
        } else {
            return false
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
    public onClickPostEventsTab(tab): void {
        this.postTab = tab;
    }

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
                        this._getFeed()
                    })
                }

            })
        }

    }

    public onPostCreated(event): void {
        this._pageIndex = 1;
        this._isCountCalculated = false;
        this._pagesCount = 0;
        this.feedItem = [];
        this._getFeed();

    }

    get email(): string {

        if (this.user)
            return !this.checkIsMe() ? this.user.coach_user.email : this.user.user.email
    }
    get firstName(): string {

        if (this.user)
            return !this.checkIsMe() ? this.user.coach_user.first_name : this.user.user.first_name
    }


    public openGalleryModal(event, message, item): void {

        if (event) {
            const dialogRef = this._dialog.open(GalleryModal, {
                width: "900px",
                data: {
                    // data:this.mediaItem,
                    data: item,
                    type: message,
                }
            })
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}