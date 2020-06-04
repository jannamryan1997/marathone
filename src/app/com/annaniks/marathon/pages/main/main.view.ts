import { Component, OnInit } from "@angular/core";
import { UserService } from '../../core/services/user.service';

@Component({
    selector: "main-view",
    templateUrl: "main.view.html",
    styleUrls: ["main.view.scss"]
})

export class MainView implements OnInit {
    constructor(private _userService:UserService) {
    }

    ngOnInit() { }

    get showUserData(): boolean {
        return this._userService.isAuthorized;
    }

}