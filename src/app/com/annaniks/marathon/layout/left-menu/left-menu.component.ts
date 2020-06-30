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
            { routerLink: `/home/${role}`, title: "Home", icon: "home" },
            { routerLink: "/profile", title: "Profile", icon: "person" },
            { routerLink: "#", title: "Dashboard", icon: "person" },
            { routerLink: "#", title: "Marathon", icon: "person" },
            { routerLink: "#", title: "My Recips", icon: "person" },
            { routerLink: "#", title: "My Training", icon: "person" },
        ]
    }

    ngOnInit() {}

    ngAfterViewInit() { }

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;
    }

}