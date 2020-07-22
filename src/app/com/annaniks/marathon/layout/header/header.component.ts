import { Component, OnInit, ElementRef, ViewChild, Inject } from "@angular/core";
import { MenuItem } from '../../core/models';
import { UserService } from '../../core/services/user.service';
import { AuthModal } from '../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { UserResponseData } from '../../core/models/user';

@Component({
    selector: "app-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"]
})

export class HeaderComponent implements OnInit {
    public profileUser: UserResponseData;
    public showPfofileMenu: boolean = false;
    public leftMenuItem: MenuItem[] = [];
    public localImage: string = "/assets/images/user-icon-image.png";

    public menuItem: MenuItem[] = [
        { routerLink: "/feed", title: "Feed" },
        { routerLink: "#", title: "Coaches" },
        { routerLink: "#", title: "Recipes" },
        { routerLink: "#", title: "Articles" },
        { routerLink: "#", title: "Q & A" },
        { routerLink: "#", title: "Packages" },
    ]



    constructor(private _profileUserService: UserService,
        private _mathDialog: MatDialog,
        private _cookieService: CookieService,
        private _router: Router,
        @Inject("FILE_URL") private _fileUrl,
    ) {
        const role = this._cookieService.get('role') || '';
        this.menuItem = [
            { routerLink: `/feed`, title: "Home", activeIcon: "assets/icons/Profile_blue.svg" },
            { routerLink: `/profile/${role}`, title: "Profile", activeIcon: "assets/icons/Profile_blue.svg" },
            { routerLink: "#", title: "Dashboard", activeIcon: "assets/icons/Profile_blue.svg" },
            // { routerLink: "#", title: "Marathon", activeIcon: "assets/icons/Profile_blue.svg" },
            // { routerLink: "#", title: "My Recips", activeIcon: "assets/icons/Profile_blue.svg" },
            // { routerLink: "#", title: "My Training", activeIcon: "assets/icons/Profile_blue.svg" },
        ]
    }

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
        if (this._profileUserService.user) {

            this.profileUser = this._profileUserService.user;
            if (this.profileUser.data.avatar) {
                this.localImage = this._fileUrl + this.profileUser.data.avatar;
            }

            return this._profileUserService.isAuthorized;
        }
    }

    onClickedOutside(e: Event) {
        this.showPfofileMenu = false;
    }

    public logOut(): void {
        this._cookieService.removeAll();
        this._profileUserService.isAuthorized = false;
        this._profileUserService.user = null;
        this._router.navigate(['/feed']);
        location.reload();
    }

}