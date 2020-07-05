import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
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
    public profileUser:UserResponseData;
    public showPfofileMenu: boolean = false;
    public localImage:string="/assets/images/user-icon-image.png";

    public menuItem: MenuItem[] = [
        { routerLink: "/feed", title: "Feed" },
        { routerLink: "#", title: "Coaches" },
        { routerLink: "#", title: "Recipes" },
        { routerLink: "#", title: "Articles" },
        { routerLink: "#", title: "Q & A" },
        { routerLink: "#", title: "Packages"},
        // { routerLink: "#", title: "Workout Music" },
    ]
    constructor(private _profileUserService: UserService,
        private _mathDialog: MatDialog,
        private _cookieService: CookieService,
        private _router: Router
    ) { 
      
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
        if(this._profileUserService.user){

        this.profileUser = this._profileUserService.user;
        // this.localImage = 'http://192.168.1.115:9000/media/' + this.profileUser.data.avatar;
        if( this.profileUser.data.avatar){
            this.localImage = 'http://annaniks.com:6262/media/' + this.profileUser.data.avatar;
        }
   
        return this._profileUserService.isAuthorized;
        }
    }
    
    onClick(): void {
    }

    public logOut(): void {
        this._cookieService.removeAll();
        this._profileUserService.isAuthorized = false;
        this._profileUserService.user = null;
        this._router.navigate(['/feed']);
         location.reload();
    }

}