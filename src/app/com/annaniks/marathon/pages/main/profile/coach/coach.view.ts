import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../../core/services/user.service';
import { UserResponseData } from '../../../../core/models/user';

@Component({
    selector: "app-coach",
    templateUrl: "coach.view.html",
    styleUrls: ["coach.view.scss"]
})

export class CoachView implements OnInit {
    public user: UserResponseData;
    public showTitle: boolean;
    public tab: number = 1;
    public galerryTab: number = 1;
    public reviewItem = [{}, {}, {}, {}, {}]

    constructor(private _userService: UserService) {
        this.user = this._userService.user;
    }

    ngOnInit() { }

    public onClickSeeMore(): void {
        this.showTitle = !this.showTitle;
    }
    public onClickTab(tab): void {
        this.tab = tab;

    }
    public onClickGalerryTab(tab): void {

        this.galerryTab = tab;
    }



}