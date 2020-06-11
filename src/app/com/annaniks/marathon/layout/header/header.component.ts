import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MenuItem } from '../../core/models';
import { ProfileUserService } from '../../core/services/user.service';
import { AuthModal } from '../../core/modals';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: "app-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"]
})

export class HeaderComponent implements OnInit {
    public profileUser;
    public showPfofileMenu:boolean=false;
    public menuItem: MenuItem[] = [
        { routerLink: "/feed", title: "Feed" },
        { routerLink: "#", title: "Coaches" },
        { routerLink: "#", title: "Recipes" },
        { routerLink: "#", title: "Workouts" },
        { routerLink: "#", title: "Articels" },
        { routerLink: "#", title: "Q & A" },
        { routerLink: "#", title: "Transform" },
        { routerLink: "#", title: "Workout Music" },
    ]
    constructor(private _profileUserService: ProfileUserService,private _mathDialog:MatDialog) { }

    ngOnInit() { }

public showProfile():void{
    this.showPfofileMenu =! this.showPfofileMenu;
}

public onClickOpenAuth():void{
    this._mathDialog.open(AuthModal, {
        width: "100%",
        maxWidth: "100vw",
    })
}

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;
    }
    }

