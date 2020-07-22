import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MenuItem, FollowItem } from '../../core/models';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: "app-left-menu",
    templateUrl: "left-menu.component.html",
    styleUrls: ["left-menu.component.scss"]
})

export class LeftMenuCompomemtn implements OnInit, AfterViewInit {
    public tab: number = 1;
    public activeTab: string;
    public profileUser;
    public settingItem: FollowItem[] = [
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
    ]
    public leftMenuItem: MenuItem[] = [
        { routerLink: "/feed", title: "Feed", icon: "/assets/icons/feed.svg", activeIcon: "assets/icons/feed_blue.svg" },
        { routerLink: "#", title: "Coaches", icon: "/assets/icons/coach.svg", activeIcon: "assets/icons/coach_blue.svg" },
        { routerLink: "#", title: "Packages", icon: "/assets/icons/package.svg", activeIcon: "assets/icons/package_blue.svg" },
        { routerLink: "#", title: "Recipes", icon: "/assets/icons/recipe.svg", activeIcon: "assets/icons/recipe_blue.svg" },
        { routerLink: "#", title: "Articles", icon: "/assets/icons/article.svg", activeIcon: "assets/icons/article_blue.svg" },
        // { routerLink: "#", title: "Q & A", icon: "/assets/icons/Profile-left.svg", activeIcon: "assets/icons/Profile_blue.svg" },

    ]


    constructor(
        private _cookieService: CookieService,
        private _profileUserService: UserService,
    ) {
        const role = this._cookieService.get('role') || '';
        // this.leftMenuItem = [
        //     { routerLink: `/feed`, title: "Home", icon: "/assets/icons/Profile-left.svg", activeIcon: "assets/icons/Profile_blue.svg" },
        //     { routerLink: `/profile/${role}`, title: "Profile", icon: "/assets/icons/Profile-left.svg", activeIcon: "assets/icons/Profile_blue.svg" },
        //     { routerLink: "#", title: "Dashboard", icon: "/assets/icons/Profile-left.svg", activeIcon: "assets/icons/Profile_blue.svg" },
        //     { routerLink: "#", title: "Marathon", icon: "/assets/icons/Profile-left.svg", activeIcon: "assets/icons/Profile_blue.svg" },
        //     { routerLink: "#", title: "My Recips", icon: "/assets/icons/Profile-left.svg", activeIcon: "assets/icons/Profile_blue.svg" },
        //     { routerLink: "#", title: "My Training", icon: "/assets/icons/Profile-left.svg", activeIcon: "assets/icons/Profile_blue.svg" },
        // ]
    }

    ngOnInit() { }

    ngAfterViewInit() { }

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;
    }

}