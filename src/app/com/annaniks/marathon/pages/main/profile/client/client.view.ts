import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../../core/services/user.service';
import { FeedService } from '../../feed/feed.service';
import { finalize, takeUntil, switchMap, map, take } from 'rxjs/operators';
import { FeedResponseData, FeedData } from '../../../../core/models';
import { RemoveModal, GalleryModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, of, iif } from 'rxjs';
import { ProfileService } from '../../../../core/services/profile.service';
import { CountryService } from '../../../../core/services/country.service';


@Component({
    selector: "app-client",
    templateUrl: "client.view.html",
    styleUrls: ["client.view.scss"]
})

export class ClientView implements OnInit {
    public feedItem: FeedResponseData[] = [];
    public user: any;
    public tab: number = 1;
    public galerryTab: number = 1;
    public postTab: number = 1;
    public loading: boolean = false;
    public throttle = 300;
    public reviewItem = [{}];
    public scrollDistance = 1;
    public scrollUpDistance = 2;
    public infiniteScrollDisabled = false;
    private _pageIndex = 1
    private _isCountCalculated = false;
    private _pagesCount: number;
    private _userSlug: string;
    private unsubscribe$ = new Subject<void>()
    public userStatus: string;
    public seeMore: boolean = false;
    public languageName = [];
    public mediaItem = [];
    public feedMediaItem = [];

    constructor(
        private _feedService: FeedService,
        private _dialog: MatDialog,
        private _router: Router,
        private _userService: UserService,
        private _profileService: ProfileService,
        private _countryService: CountryService,
        private _activatedRoute: ActivatedRoute
    ) {
        this._activatedRoute.parent.parent.params.pipe(takeUntil(this.unsubscribe$)).subscribe((param) => {
            if (param && param.id) {
                this._userSlug = param.id;
                if (this._router.url.search('coach'))
                    this._router.navigate([this._router.url])
                this.userStatus = '';
                this._getLanguages();
                this._getProfile()
            }
        })
    }

    ngOnInit() { }

    private _getProfile() {
        this._profileService.getProfile('client', this._userSlug).pipe(takeUntil(this.unsubscribe$),
            switchMap((data) => {
                if (data.results && data.results.length) {
                    this.user = data.results[0];
                    this._showseeMore();
                    return this._getLanguages().pipe(switchMap((data) => {
                        return this._getFeed()
                    }));
                } else {
                    return of()
                }
            }))
            .subscribe()
    }
    public checkIsMe() {
        if (this._userService.user) {
            return (!this.user || +this.user.id == +this._userService.user.data.id)
        } else {
            return false
        }
    }
    private _getFeed() {
        this.loading = true;
        let isAll = this.checkIsMe() ? 'me' : 'true'
        return this._profileService.getFeedByProfileId('creator_client', this.user.id, isAll).pipe(finalize(() => { this.loading = false }),
            map((data: FeedData) => {
                this.feedItem = data.results;
                for (let item of this.feedItem) {
                    this.feedMediaItem.push(item);
                    for (let media of item.feed_media) {
                        if (typeof media.content == 'string') {
                            media.content = JSON.parse(media.content);
                            this.mediaItem.push(media.content);
                        }
                    }
                }
                return data
            }))
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

    private _getLanguages() {
        let url: string;
        return this._countryService.getLanguages().pipe(map((data) => {
            this.languageName = []

            data.results.map((name, index) => {
                url = name.url;
                if (this.user && this.user.language)
                    this.user.language.forEach(element => {
                        if (url === element) {
                            this.languageName.push({ name: name.name });

                        }
                    })
            })
            return data
        }))

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


    public deletedFeedItem(event): void {
        if (event) {
            const dialogRef = this._dialog.open(RemoveModal, {
                width: "400px"
            })
            dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$),
                switchMap((data) => {
                    if (data === "deleted") {
                        return this._feedService.deleteFeed(event).pipe(switchMap(() => {
                            this._pageIndex = 1;
                            this._isCountCalculated = false;
                            this._pagesCount = 0;
                            this.feedItem = [];
                            return this._getFeed()
                        }))

                    } else {
                        return of()
                    }
                })).subscribe()
        }

    }

    public onPostCreated(event): void {
        this._pageIndex = 1;
        this._isCountCalculated = false;
        this._pagesCount = 0;
        this.feedItem = [];
        this._getFeed().pipe(takeUntil(this.unsubscribe$)).subscribe();

    }
    public openGalleryModal(event, message, item): void {
        if (event) {
            const dialogRef = this._dialog.open(GalleryModal, {
                width: "1000px",
                data: {
                    data: item,
                    type: message,
                }
            })
        }
    }

    get email(): string {
        if (this.user)
            return this.user.slug
    }
    get firstName(): string {
        if (this.user)
            return this.user.user.first_name
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}