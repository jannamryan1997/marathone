import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { UploadFileResponse } from '../../../core/models';
import { ProfileService } from '../../../core/services/profile.service';
import { FollowService } from '../../../core/services/follow.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileCoverModal } from '../../../core/modals';
import * as CryptoJS from 'crypto-js';



@Component({
    selector: "profile-view",
    templateUrl: "profile.view.html",
    styleUrls: ["profile.view.scss"]
})

export class ProfileView implements OnInit {
    private unsubscribe$ = new Subject<void>();
    public role: string;
    public languageName: string;
    public showMore: boolean = false;
    public showProfile: boolean = false;
    public router: boolean = false;
    public loading: boolean = false;
    private _defaultImage = '/assets/images/user-icon-image.png'
    public localImage: string;
    public headerLocalImage: string;
    public userRole: string;
    public user;
    public useLanguageUrl: string;
    public _userSlug: string;
    public isFollowed: boolean = false;
    public routerUrl: string;
    public userData;
    constructor(

        @Inject("FILE_URL") private _fileUrl,
        private _userService: UserService,
        private _profileService: ProfileService,
        private _cookieService: CookieService,
        private _activatedRoute: ActivatedRoute,
        private _followService: FollowService,
        private _dialog: MatDialog,
        private _router: Router) {

        this.role = this._cookieService.get('role');
        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$),
            switchMap((params) => {
                if (params && params.id) {
                    window.scrollTo(0, 0);
                    let urls = this._router.url.split('/');
                    if (urls && urls.length) {
                        this.userRole = urls[urls.length - 1];
                    }
                    this._userSlug = params.id;
                    return this._getProfileById();
                } else {
                    return of()
                }
            })).subscribe()
        this.routerUrl = window.location.href;
        this.userData = this._userService.user;
    }

    ngOnInit() { }

    private _getProfile() {
        this._getProfileById().subscribe()
    }
    private _getProfileById() {
        return this._profileService.getProfile(this.userRole, this._userSlug).pipe(takeUntil(this.unsubscribe$),
            map((data) => {
                if (data.results && data.results.length) {
                    this.user = data.results[0];
                    this.isFollowed = this.user.is_follower;
                    this.localImage = this.user.avatar ? this._fileUrl + this.user.avatar : this._defaultImage;
                    this.headerLocalImage = this.user.cover ? this._fileUrl + this.user.cover : this._defaultImage;
                }
            }))

    }
    private _putClient(file_name, type): void {
        if (type === 'avatar') {
            this._userService.user.data.avatar = file_name;

        } else {
            this._userService.user.data.cover = file_name;
        }
        if (this.role === 'client') {
            this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getClient().subscribe((data) => {
                        if (type === 'avatar') {
                            this.localImage = this._fileUrl + data.data.avatar;
                        }
                        else {
                            this.headerLocalImage = this._fileUrl + data.data.cover;
                        }
                    });
                }),
                err => {
                    this.loading = false;
                }
        }
        else {
            this._userService.putCoatch(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getCoatch().subscribe((data) => {
                        if (type === 'avatar') {
                            this.localImage = this._fileUrl + data.data.avatar;
                        }
                        else {
                            this.headerLocalImage = this._fileUrl + data.data.cover;
                        }

                    });


                })
        }
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
                        this._putClient(data.file_name, type);
                        this.loading = false;
                    })
            }
        }
    }


    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }
    public checkIsMe() {
        if (this._userService.user) {
            return (!this.user || +this.user.user.id == +this._userService.user.data.user.id)
        } else {
            return false
        }
    }

    public follow() {
        this._followService.follow(this.user, this.role, this._userService.user.data.url, this.userRole, this.user.url)
            .pipe(takeUntil(this.unsubscribe$),
                switchMap((data) => {
                    return this._getProfileById()
                })).subscribe()
    }
    public setServicePhoto(event) {
        this.loading = true;
        if (event) {
            this._setFormDataForImage(event, 'avatar');

        }

    }
    public setServiceHeaderPhoto(event) {
        if (event) {
            this._setFormDataForImage(event, 'headerImage');

        }
    }

    public onClickedOutside(event): void {
        this.showMore = false;
    }

    public copyUrl(): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.routerUrl;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    public openProfileCoverModal(event): void {
        const dialogRef = this._dialog.open(ProfileCoverModal, {
            width: "700px",
            data: {
                localImage: event,
            }
        })
    }
    public copyReferralUrl() {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';   
        let conversionEncryptOutput = CryptoJS.AES.encrypt(this.user.user.id.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32'),'secret key').toString();
        selBox.value = `http://uat.marathon.me/refferal/${conversionEncryptOutput}`;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

