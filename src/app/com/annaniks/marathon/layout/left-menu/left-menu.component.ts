import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MenuItem } from '../../core/models';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthModal } from '../../core/modals';
import { ProfileUserService } from '../../core/services/user.service';

@Component({
    selector: "app-left-menu",
    templateUrl: "left-menu.component.html",
    styleUrls: ["left-menu.component.scss"]
})

export class LeftMenuCompomemtn implements OnInit, AfterViewInit {

    public tab: number = 1;
    public activeTab: string;
    public profileUser;
    public leftMenuItem: MenuItem[] = [
        { routerLink: "/home", title: "Home", icon: "home" },
        { routerLink: "#", title: "Profile", icon: "person" },
        { routerLink: "#", title: "Dashboard", icon: "person" },
        { routerLink: "#", title: "Marathon", icon: "person" },
        { routerLink: "#", title: "My Recips", icon: "person" },
        { routerLink: "#", title: "My Training", icon: "person" },
    ]


    constructor(private _cookieService: CookieService,
        private _router: Router, private _mathDialog: MatDialog,
        private _profileUserService: ProfileUserService,

    ) { }

    ngOnInit() {

    }

    ngAfterViewInit() { }

    public onClickTab(item, routerLink): void {

        if (!this._cookieService.get('access') && !this._cookieService.get('refresh') && !this._cookieService.get('datr')) {
            this._mathDialog.open(AuthModal, {
                width: "100%",
                maxWidth: "100vw",
            })
        }
        else if (this._cookieService.get('datr')) {
            this.activeTab = item.routerLink;
            this._router.navigate([routerLink]);
        }
        else if (this._cookieService.get('access') && this._cookieService.get('refresh')) {
            this.activeTab = item.routerLink;
            this._router.navigate([routerLink]);
        }

    }
    public onChangeTab(event): void {
        this.tab = event;
    }
    public onClickOpenSignIn(event): void {
        this.tab = event;
    }

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;
    }


}