import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../../core/services/user.service';
import { UserResponseData, UserData } from '../../../../core/models/user';
import { FeedService } from '../../feed/feed.service';
import { FeedResponseData } from '../../../../core/models';
import { finalize, takeUntil } from 'rxjs/operators';
import { RemoveModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile.service';

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
    constructor(private _userService: UserService,
        private _feedService:
            FeedService, private _dialog: MatDialog,
        private _profileService: ProfileService,
        private _activatedRoute: ActivatedRoute, private _router: Router) {
        let urls = this._router.url.split('/');
        if (urls && urls.length && urls.length == 4) {
            this.userId = +urls[urls.length - 2];
        }
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
            this._profileService.getProfile('coach', this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
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
    private async _getFeed(page: number) {
        this.infiniteScrollDisabled = true;
        const data = await this._feedService.feed(this._pageIndex)
            .pipe(
                finalize(() => {
                })
            )
            .toPromise()
        if (this.feedItem.length === 0) {
        }
        if (!this._isCountCalculated) {
            this._pagesCount = Math.ceil(data.count / 10);
            this._isCountCalculated = true;
        }
        if (this._pageIndex > this._pagesCount) {
            return;
        }

        this.feedItem.push(...data.results);
        this._pageIndex++;
        for (let item of this.feedItem) {
            for (let media of item.feed_media) {
                if (typeof media.content == 'string') {
                    media.content = JSON.parse(media.content)
                }
            }
        }
        this.infiniteScrollDisabled = false;
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
    public onClickPostEventsTab(tab): void {
        this.postTab = tab;
    }
    public async onScroll() {
        if (this._pageIndex > this._pagesCount) {
            return;
        }
        this._getFeed(this._pageIndex);
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
                        this._getFeed(this._pageIndex)
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
        this._getFeed(this._pageIndex);

    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    get email(): string {
        if (this.user)
            return this.userId ? this.user.coach_user.email : this.user.user.email
    }
    get firstName(): string {
        if (this.user)
            return this.userId ? this.user.coach_user.first_name : this.user.user.first_name
    }
}