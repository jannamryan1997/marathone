import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MenuItem } from '../../core/models';
import { UserService } from '../../core/services/user.service';
import { AuthModal } from '../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
    selector: "app-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"]
})

export class HeaderComponent implements OnInit {
    public profileUser;
    public showPfofileMenu: boolean = false;
    public menuItem: MenuItem[] = [
        { routerLink: "/feed", title: "Feed" },
        { routerLink: "#", title: "Coaches" },
        { routerLink: "/recipe", title: "Recipes" },
        { routerLink: "#", title: "Workouts" },
        { routerLink: "/article", title: "Articels" },
        { routerLink: "#", title: "Q & A" },
        { routerLink: "#", title: "Transform" },
        { routerLink: "#", title: "Workout Music" },
    ]
    constructor(private _profileUserService: UserService,
        private _mathDialog: MatDialog,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _router: Router
    ) { }

    ngOnInit() { }

    public showProfile(): void {
        this.showPfofileMenu = !this.showPfofileMenu;
    }

    public onClickOpenAuth(): void {
        this._mathDialog.open(AuthModal, {
            width: "100%",
            maxWidth: "100vw",
        })
    }

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;

    }
    onClick(): void {
        console.log(this.profileUser);
    }

    public logOut(): void {
        this._cookieService.removeAll();
        this._userService.isAuthorized = false;
        this._userService.user = null;
        this._router.navigate(['/']);
    }

}