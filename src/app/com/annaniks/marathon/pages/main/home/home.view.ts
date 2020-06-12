import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ProfileUserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: "home-view",
    templateUrl: "home.view.html",
    styleUrls: ["home.view.scss"]
})

export class HomeView implements OnInit {
    public role: string;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public showProfile: boolean = false;

    constructor(private _router: Router, private _profileUserService: ProfileUserService, private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
    }

    ngOnInit() { }

    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }

    public reloadProfile() {
        this.showProfile = !this.showProfile;
    }
}
