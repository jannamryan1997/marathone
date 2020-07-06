import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MenuItem, FollowItem } from '../../core/models';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthModal } from '../../core/modals';
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
    public leftMenuItem: MenuItem[] = [];
    public settingItem: FollowItem[] = [
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
    ]


    constructor(
        private _cookieService: CookieService,
        private _profileUserService: UserService,
    ) {
        const role = this._cookieService.get('role') || '';
        this.leftMenuItem = [
            // { routerLink: `/home/${role}`, title: "Home", icon: "home" },
            { routerLink: `/feed`, title: "Home", icon: "/assets/icons/Profile-left.svg" },
            { routerLink: `/profile/${role}`, title: "Profile", icon: "/assets/icons/Profile-left.svg" },
            { routerLink: "#", title: "Dashboard", icon: "/assets/icons/Profile-left.svg" },
            { routerLink: "#", title: "Marathon", icon: "/assets/icons/Profile-left.svg" },
            { routerLink: "#", title: "My Recips", icon: "/assets/icons/Profile-left.svg" },
            { routerLink: "#", title: "My Training", icon: "/assets/icons/Profile-left.svg" },
        ]
    }

    ngOnInit() {}

    ngAfterViewInit() { }

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;
    }

}