import { Component, OnInit, Inject } from "@angular/core";
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
        public router: Router,
        @Inject("FILE_URL") private _fileUrl,
    ) {
        this.menuItem = [
            { routerLink: `/feed`, title: "Home", activeIcon: "assets/icons/Profile_blue.svg", key: 'feed' },
            { routerLink: this._getProfileUrl(), title: "Profile", activeIcon: "assets/icons/Profile_blue.svg", key: 'profile' },
            { routerLink: "#", title: "Dashboard", activeIcon: "assets/icons/Profile_blue.svg", key: 'dashboard' },
            // { routerLink: "#", title: "Marathon", activeIcon: "assets/icons/Profile_blue.svg" },
            // { routerLink: "#", title: "My Recips", activeIcon: "assets/icons/Profile_blue.svg" },
            // { routerLink: "#", title: "My Training", activeIcon: "assets/icons/Profile_blue.svg" },
        ]
    }

    ngOnInit() { }

    private _getProfileUrl() {
        const role = this._cookieService.get('role') || '';
        if (this._profileUserService.user && this._profileUserService.user.data && role) {
            return `/profile/${this._profileUserService.user.data.slug}/${role}`
        } else {
            return `/profile`
        }
    }
    public showProfile(): void {
        this.showPfofileMenu = !this.showPfofileMenu;
    }

    public onClickOpenAuth(value: string): void {
        const dialogRef = this._mathDialog.open(AuthModal, {
            data: {
                value: value,
            }
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

    public onClickedOutside(e: Event) {
        this.showPfofileMenu = false;
    }
    public isActive(url: string): boolean {
        return this.router.url.includes(url);
    }
    public logOut(): void {
        this._cookieService.removeAll();
        this._profileUserService.isAuthorized = false;
        //this._profileUserService.user = null;

        this.router.navigate(['/feed']);
        // location.reload();
    }

}