import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MenuItem } from '../../core/models';
import { ProfileUserService } from '../../core/services/user.service';

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
    constructor(private _profileUserService: ProfileUserService,) { }

    ngOnInit() { }

public showProfile():void{
    this.showPfofileMenu =! this.showPfofileMenu;
}

    get showUserData(): boolean {
        this.profileUser = this._profileUserService.user;
        return this._profileUserService.isAuthorized;
    }
    }

