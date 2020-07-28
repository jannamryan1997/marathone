import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { UploadFileResponse } from '../../../core/models';
import { ProfileService } from '../../../core/services/profile.service';



@Component({
    selector: "profile-view",
    templateUrl: "profile.view.html",
    styleUrls: ["profile.view.scss"]
})

export class ProfileView implements OnInit {
    private unsubscribe$ = new Subject<void>()
    public role: string;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public showProfile: boolean = false;
    public router: boolean = false;
    public loading: boolean = false;
    public localImage: string = '/assets/images/user-icon-image.png';
    public headerLocalImage: string = '/assets/images/user-icon-image.png';
    public userRole: string;
    public user;
    public postItem = [
        {
            postType: "image",
            image: "assets/images/foodimg.png"
        },

        {
            postType: "combinations",
            image: "assets/images/img3.png",
        }
    ]
    public userId: number;
    public isFollowed: boolean = false;
    constructor(
        @Inject("FILE_URL") private _fileUrl,
        private _userService: UserService,
        private _profileService: ProfileService,
        private _cookieService: CookieService, private _activatedRoute: ActivatedRoute, private _router: Router) {
        let urls = this._router.url.split('/');
        if (urls && urls.length) {
            this.userRole = urls[urls.length - 1];
        }

        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this.userId = params.id;
        })


    }

    ngOnInit() {
        this._getProfile()
    }
    private _getProfile() {
        this.role = this._cookieService.get('role');
        if (this.checkIsMe()) {
            if (this._userService.user && this._userService.user.data.avatar) {
                this.localImage = this._fileUrl + this._userService.user.data.avatar;
                this.headerLocalImage = this._fileUrl + this._userService.user.data.cover;
            }

        } else {
            this._getProfileById().subscribe()
        }

    }
    private _getProfileById() {
        return this._profileService.getProfile(this.userRole, this.userId).pipe(takeUntil(this.unsubscribe$),
            map((data) => {
                this.user = data;
                this.isFollowed = data.is_follower;
                if (data.avatar)
                    this.localImage = this._fileUrl + data.avatar;
                if (data.cover)
                    this.headerLocalImage = this._fileUrl + data.cover;
                return data;

            }))

    }
    private _putClient(file_name, type): void {
        if (type == 'avatar') {
            this._userService.user.data.avatar = file_name;
        } else {
            this._userService.user.data.cover = file_name;
        }
        if (this.role === 'client') {
            this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getClient().subscribe((data) => {
                        this.localImage = this._fileUrl + data.data.avatar;
                        this.headerLocalImage = this._fileUrl + data.data.cover;

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
                        this.localImage = this._fileUrl + data.data.avatar;
                        this.headerLocalImage = this._fileUrl + data.data.cover;

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



    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }
    public checkIsMe() {
        if (this._userService.user) {
            return (!this.userId || +this.userId == +this._userService.user.data.id)
        } else {
            return false
        }
    }
    public follow() {
        if (!this.isFollowed) {
            let sendBody = {}
            if (this.role == 'client') {
                sendBody['who_user'] = this._userService.user.data.url
            } else {
                sendBody['who_coach'] = this._userService.user.data.url
            }
            if (this.userRole == 'client') {
                sendBody['whom_user'] = this.user.url
            } else {
                sendBody['whom_coach'] = this.user.url

            }
            this._profileService.follow(sendBody).pipe(takeUntil(this.unsubscribe$)).pipe(
                switchMap(() => {
                    return this._getProfileById()
                })
            )
                .subscribe();
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
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

}

