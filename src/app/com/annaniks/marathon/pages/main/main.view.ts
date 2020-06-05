import { Component, OnInit } from "@angular/core";
import { ProfileUserService } from '../../core/services/user.service';

@Component({
    selector: "main-view",
    templateUrl: "main.view.html",
    styleUrls: ["main.view.scss"]
})

export class MainView implements OnInit {
    constructor(private _profileUserService:ProfileUserService) {
    }

    ngOnInit() { }

    get showUserData(): boolean {
        return this._profileUserService.isAuthorized;
    }

}