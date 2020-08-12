import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../../core/services/user.service';
import { FeedService } from '../../feed/feed.service';
import { FeedResponseData, FeedData } from '../../../../core/models';
import { finalize, takeUntil, switchMap, map } from 'rxjs/operators';
import { RemoveModal, GalleryModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Subject, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile.service';
import { CountryService } from '../../../../core/services/country.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    public languageName = [];
    public mediaItem = [];
    public feedMediaItem = [];
    private _userSlug: string;
    constructor(
        private _userService: UserService,
        private _feedService: FeedService,
        private _dialog: MatDialog,
        private _profileService: ProfileService,
        private _countryService: CountryService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.parent.parent.params.subscribe((param) => {
            if (param && param.id) {
                this._userSlug = param.id;
                if (this._router.url.search('client'))
                    this._router.navigate([this._router.url])
                this.userStatus = '';
                this._getProfile();
                this._getLanguages();
            }
        })
    }

    ngOnInit() { }



    autoSize(event){
        if(event){
        const el = document.getElementById('textarea');
            setTimeout(()=>{      
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
              },0);
            }  
    }

    private _getProfile() {
        this._profileService.getProfile('coach', this._userSlug).pipe(takeUntil(this.unsubscribe$),
            switchMap((data) => {
                if (data.results && data.results.length) {
                    this.user = data.results[0];
                    this._showseeMore();
                    return this._getFeed()
                } else {
                    return of()
                }
            })).subscribe()
    }

    private _getFeed() {
        this.loading = true;
        let isAll = this.checkIsMe() ? 'me' : 'true'
        return this._profileService.getFeedByProfileId('creator', this.user.id, isAll).pipe(finalize(() => { this.loading = false }),
            map((data: FeedData) => {
                this.feedItem = data.results;
                for (let item of this.feedItem) {
                    if(item){
                        this.feedMediaItem.push(item);
                  
                    for (let media of item.feed_media) {
                        if (typeof media.content == 'string') {
                            media.content = JSON.parse(media.content);
                            this.mediaItem.push(media.content);
                        }
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

    private _getLanguages(): void {
        let url: string;
        this._countryService.getLanguages().subscribe((data) => {
            data.results.map((name, index) => {
                url = name.url;
                if (this._userService.user)
                    this._userService.user.data.language.forEach(element => {
                        if (url === element) {
                            this.languageName.push({ name: name.name });
                        }
                    })


            })
        })
    }

    public checkIsMe() {
        if (this._userService.user) {
            return (!this.user || +this.user.id == +this._userService.user.data.id)
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

    get email(): string {
        if (this.user && this.user.user)
            return this.user.user.email
    }
    get firstName(): string {
        if (this.user && this.user.user)
            return this.user.user.first_name
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
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}