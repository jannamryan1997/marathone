import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from '../../../../core/services/user.service';
import { FeedService } from '../../feed/feed.service';
import { finalize, takeUntil, switchMap, map, take } from 'rxjs/operators';
import { FeedResponseData, FeedData, UploadFileResponse } from '../../../../core/models';
import { RemoveModal, GalleryModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, of, forkJoin } from 'rxjs';
import { ProfileService } from '../../../../core/services/profile.service';
import { CountryService } from '../../../../core/services/country.service';
import { CookieService } from 'ngx-cookie';


@Component({
    selector: "app-client",
    templateUrl: "client.view.html",
    styleUrls: ["client.view.scss"]
})

export class ClientView implements OnInit {
    public galleryContentType: boolean;
    public inputTypeValue;
    public fileName: string;
    public contentFileName: string;
    public showGallery: boolean;
    public showVideo: boolean;
    public _unsbscribe = new Subject<void>();
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
    public specialityName = [];
    public role: string;
    constructor(
        @Inject("FILE_URL") private _fileUrl,
        private _feedService: FeedService,
        private _dialog: MatDialog,
        private _router: Router,
        private _userService: UserService,
        private _profileService: ProfileService,
        private _countryService: CountryService,
        private _activatedRoute: ActivatedRoute,
        private _cookieService: CookieService,
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
        this.role = this._cookieService.get('role');
    }

    ngOnInit() { }

    private _getProfile() {
        this._profileService.getProfile('client', this._userSlug).pipe(takeUntil(this.unsubscribe$),
            switchMap((data) => {
                if (data.results && data.results.length) {
                    this.user = data.results[0];
                    this._showseeMore();
                    return this._combineObservable().pipe(switchMap((data) => {
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
            return (!this.user || +this.user.user.id == +this._userService.user.data.user.id)
        } else {
            return false
        }
    }


    private _getFeed() {
        this.loading = true;
        let isAll = this.checkIsMe() ? 'me' : 'true'
        return this._profileService.getFeedByProfileId('creator_client', this.user.id, isAll).pipe(finalize(() => { this.loading = false }),
            map((data: FeedData) => {
                this.feedMediaItem = [];
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
        }else{
            this.seeMore=false
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
        return this._countryService.getSpeciality()
            .pipe(map((data) => {
                this.specialityName = []
                data.results.map((name, index) => {
                    url = name.url;
                    if (this.user.speciality)
                        this.user.speciality.forEach(element => {
                            if (url === element) {
                                this.specialityName.push({ name: name.name });

                            }
                        })
                })
                return data
            }))

    }
    private _combineObservable() {
        const combine = forkJoin(
            this._getLanguages(),
            this._getSpeciality()
        )
        return combine
    }
    public onClickSeeMore(): void {
        this.userStatus = this.user.status.slice(0, this.user.status.length);
        this.seeMore = false;

    }



    public onClickTab(tab): void {
        this.tab = tab;
        this.galerryTab = 1;
        this._getFeed().pipe(takeUntil(this.unsubscribe$)).subscribe()
        if (this.tab === 2) {
            if (this.feedItem && this.mediaItem.length) {
                this.galleryContentType = true;

            }
            else {
                this.galleryContentType = false;

            }
        }

    }


    public onClickGalerryTab(tab): void {
        this.galerryTab = tab;
        if (this.galerryTab === 2) {

            let imageContent = this.feedMediaItem.filter((data) => { return (data.feed_media && data.feed_media[0] && data.feed_media[0].content) ? (data.feed_media[0].content.type == 'image') : null });

            if (imageContent && imageContent.length) {
                this.showGallery = true;
            } else {
                this.showGallery = false;
            }

        }

        if (this.galerryTab === 3) {
            let videoContent = this.feedMediaItem.filter((data) => { return (data.feed_media && data.feed_media[0] && data.feed_media[0].content) ? (data.feed_media[0].content.type == 'video') || (data.feed_media[0].content.type == "videoLink") : null });
            if (videoContent && videoContent.length) {

                this.showVideo = true;
            } else {
                this.showVideo = false;
            }
        }

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
                            this.feedMediaItem = [];
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
        this.feedMediaItem = [];
        this._getFeed().pipe(takeUntil(this.unsubscribe$)).subscribe();

    }
    public openGalleryModal(event, message, item, index: number): void {
        if (event) {
            const dialogRef = this._dialog.open(GalleryModal, {
                width: "1400px",
                panelClass:'no-padding-modal',
                data: {
                    data: item,
                    type: message,
                }
            })
            dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                this._feedService.getFeedById(item.id).subscribe((val) => {
                    item.is_liked = val.is_liked
                    item.is_liked_id= val.is_liked_id
                    item.feed_comments_count= val.feed_comments_count
                    item.feed_likes_count= val.feed_likes_count                    
                    this.feedMediaItem[index] = item                    
                })
              
            })
        }
    }

    get email(): string {
        if (this.user)
            return this.user.user.last_name;
    }
    get firstName(): string {
        if (this.user)
            return this.user.user.first_name
    }



    private _setFormDataForImage(image, type: string): void {
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);

                this._userService.uploadVideoFile(formData)
                    .subscribe((data: UploadFileResponse) => {
                        this.fileName = this._fileUrl + data.file_name;
                        this.contentFileName = data.file_name;
                        this.createdPost(type)
                    })
            }
        }
    }

    public setGalleryPhoto(event, type): void {
        if (event) {
            this._setFormDataForImage(event, type);

        }
    }

    public createdPost(type): void {
        this._userService.postFeed({
            content: JSON.stringify({
                url: this.contentFileName,
                type: type,
                videoTitle: '',
            },
            ),
            role: this.role,
            is_public: true,
            title: "",

        })
            .pipe(
                takeUntil((this._unsbscribe)),
                finalize(() => {
                })
            )
            .subscribe((data) => {
                this.feedItem.push(data);
                this._getFeed().pipe(takeUntil(this.unsubscribe$)).subscribe();
                if (type === 'image') {
                    if (this.showGallery === false) {
                        this.showGallery = true;
                    }
                }
                if (type === 'video') {
                    if (this.showVideo === false) {
                        this.showVideo = true;
                    }
                }
            })
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}