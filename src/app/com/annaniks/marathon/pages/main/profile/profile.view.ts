import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



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
    constructor(
        @Inject("FILE_URL") private _fileUrl,
        private _userService: UserService,
        private _cookieService: CookieService, private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this.userId = params.id;
        })

        if (this.checkIsMe()) {
            this.role = this._cookieService.get('role');
            if (this._userService.user && this._userService.user.data.avatar) {
                this.localImage = this._fileUrl + this._userService.user.data.avatar;
            }

        }
    }

    ngOnInit() { }

    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }
    public checkIsMe() {
        if (this._userService.user)
            return (!this.userId || +this.userId == +this._userService.user.data.id)
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

