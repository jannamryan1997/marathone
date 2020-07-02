import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { UserResponseData } from '../../../core/models/user';

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
    public localImage:string='/assets/images/user-icon-image.png';
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

    constructor(private _router: Router,
        private _profileUserService: UserService,
        private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
        if(this._profileUserService.user.data.avatar){
            // this.localImage = 'http://192.168.1.115:9000/media/' + this._profileUserService.user.data.avatar;
            this.localImage = 'http://annaniks.com:6262/media/' + this._profileUserService.user.data.avatar;
        }
      
       
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
