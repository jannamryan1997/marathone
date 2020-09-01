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

@Component({
    selector: "app-coach",
    templateUrl: "coach.view.html",
    styleUrls: ["coach.view.scss"]
})

export class CoachView implements OnInit {
    public showGallery: boolean;
    public showVideo: boolean;
    public _unsbscribe = new Subject<void>();
    public feedItem: FeedResponseData[] = [];
    public user: any;
    public tab: number = 1;
    public postTab: number = 1;
    public galerryTab: number = 1;
    public loading: boolean = false;
    public reviewItem = [{}];
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
    public specialityName = [];
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

    ngOnInit() {
        this._getSpeciality();
    }



    autoSize(event) {
        if (event) {
            const el = document.getElementById('textarea');
            setTimeout(() => {
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
    }

    private _getProfile() {
        this._profileService.getProfile('coach', this._userSlug).pipe(takeUntil(this.unsubscribe$),
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
            })).subscribe()
    }

    private _getFeed() {
        this.loading = true;
        let isAll = this.checkIsMe() ? 'me' : 'true'
         return this._profileService.getFeedByProfileId('creator', this.user.id, isAll).pipe(finalize(() => { this.loading = false }),
            map((data: FeedData) => {
                this.feedMediaItem=[];
                this.feedItem = data.results;
                for (let item of this.feedItem) {
                    if (item) {
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
    private _getSpeciality() {
        let url: string;
        this._countryService.getSpeciality()
            .pipe(takeUntil(this._unsbscribe))
            .subscribe((data) => {
                this.specialityName = []
                data.results.map((name, index) => {
                    url = name.url;
                    this._userService.user.data.speciality.forEach(element => {
                        if (url === element) {
                            this.specialityName.push({ name: name.name });

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
        this.galerryTab=1;

    }
    public onClickGalerryTab(tab): void {
        this.galerryTab = tab;
        if (this.galerryTab === 2) {
            let imageContent = this.feedMediaItem.filter((data) => { return data.feed_media[0].content.type == 'image' });
            if (imageContent && imageContent.length) {
                this.showGallery = true;
            } else {
                this.showGallery = false;
            }

        }

        if (this.galerryTab === 3) {
            let videoContent = this.feedMediaItem.filter((data) => { return data.feed_media[0].content.type == 'video' || data.feed_media[0].content.type == "videoLink" });
            if (videoContent && videoContent.length) {

                this.showVideo = true;
            } else {
                this.showVideo = false;
            }
        }

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
                            this.feedMediaItem=[];
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
        this.feedMediaItem=[];
         this._getFeed().pipe(takeUntil(this.unsubscribe$)).subscribe();

    }

    get email(): string {
        if (this.user)
            return this.user.user.last_name;
    }
    get firstName(): string {
        if (this.user && this.user.user)
            return this.user.user.first_name
    }



    public openGalleryModal(event, message, item): void {
        console.log(item);
        
        if (event) {
            const dialogRef = this._dialog.open(GalleryModal, {
                width: "1400px",
                data: {
                    data: item,
                    type: message,
                }
            })
            dialogRef.afterClosed().subscribe((data)=>{
                this._getFeed().pipe(takeUntil(this.unsubscribe$)).subscribe((data)=>{
                    console.log(data);
                    
                });
            })
        }
        else{
            console.log('fffff')
        }
        
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}