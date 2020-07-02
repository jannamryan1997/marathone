import { Component, OnInit } from "@angular/core";
import { UserResponseData } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: "app-client",
    templateUrl: "client.view.html",
    styleUrls: ["client.view.scss"]
})

export class ClientView implements OnInit {
    public user:UserResponseData;
    public showTitle: boolean;
    public tab: number = 1;
    public galerryTab: number = 1;
    public reviewItem = [{}, {}, {}, {}, {}]
    
    constructor(private _profileUserService: UserService) {
        this.user = this._profileUserService.user;
     }

    ngOnInit() {  }

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