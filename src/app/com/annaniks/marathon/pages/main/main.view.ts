import { Component, OnInit } from "@angular/core";
import { UserService } from '../../core/services/user.service';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: "main-view",
    templateUrl: "main.view.html",
    styleUrls: ["main.view.scss"]
})

export class MainView implements OnInit {
    constructor(private _profileUserService:UserService,private _cookieService:CookieService) {
    }

    ngOnInit() { 
        this._getProfileData();
    }

    get showUserData(): boolean {
        return this._profileUserService.isAuthorized;
    }

    private _getClient(): void {
        this._profileUserService.getClient()
            .subscribe((data) => {
                this._profileUserService.user = data;
                this._profileUserService.isAuthorized = true;
                console.log(data);
            })
    }

    private _getCoatch(): void {
        this._profileUserService.getCoatch()
            .subscribe((data) => {
                this._profileUserService.user = data;
                this._profileUserService.isAuthorized = true;
                console.log(data);
            })
         
            
    }

    private _getProfileData(): void {
        let role: string;
        role = this._cookieService.get('role');
        if (role === 'coach') {
            console.log(role,"roleeeeeeeeeee");
            
            this._getCoatch();
        }
        else {
            this._getClient();
        }
    }

}