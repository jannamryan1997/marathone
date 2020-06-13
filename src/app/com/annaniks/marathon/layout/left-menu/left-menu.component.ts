import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MenuItem, FollowItem } from '../../core/models';
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
        { routerLink: "/home/profile", title: "Profile", icon: "person" },
        { routerLink: "/feed", title: "Dashboard", icon: "person" },
        { routerLink: "#", title: "Marathon", icon: "person" },
        { routerLink: "#", title: "My Recips", icon: "person" },
        { routerLink: "#", title: "My Training", icon: "person" },
    ]
    public settingItem: FollowItem[] = [
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
        { image: "assets/images/img1.png", name: "Olivie Gipson", email: "starting following you" },
    ]


    constructor(private _cookieService: CookieService,
        private _router: Router, private _mathDialog: MatDialog,
        private _profileUserService: ProfileUserService,

    ) { }

    ngOnInit() {
        if(this._router.url==="/home/client" ||this._router.url==="/home/coach" ){
            this.activeTab="/home";
        }
        else{
            this.activeTab=this._router.url;
        }
 
     }

    ngAfterViewInit() { }

    public onCkickActiveTab(item): void {
        this.activeTab=item;
        let role: string;
        role = this._cookieService.get('role');
        if (item === '/home' && role === 'client') {
            this._router.navigate(['/home/client'])

        }
        else if (item === '/home' && role === 'coach') {
            this._router.navigate(['/home/coach'])
        }
        else {
            this._router.navigate([item]);
        }

    }

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;
    }

}