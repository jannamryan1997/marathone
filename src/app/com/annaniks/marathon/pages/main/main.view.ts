import { Component, OnInit } from "@angular/core";
import { UserService } from '../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
    selector: "main-view",
    templateUrl: "main.view.html",
    styleUrls: ["main.view.scss"]
})

export class MainView implements OnInit {
    public getmeiD: string;
    constructor(
        private _profileUserService: UserService,
        private _cookieService: CookieService,
        public router: Router,
    ) {

    }

    ngOnInit() {
        //this._getProfileData();
    }

    get showUserData(): boolean {
        return this._profileUserService.isAuthorized;
    }

    private _getClient(): void {
        this._profileUserService.getClient()
            .subscribe((data: any) => {
                this.getmeiD = data.data.id;
                this._profileUserService.user = data;
                this._profileUserService.isAuthorized = true;
                this._cookieService.put('userId', this.getmeiD)
            })
    }

    private _getCoatch(): void {
        this._profileUserService.getCoatch()
            .subscribe((data: any) => {
                this.getmeiD = data.data.id;
                this._profileUserService.user = data;
                this._profileUserService.isAuthorized = true;
                this._cookieService.put('userId', this.getmeiD)
            })


    }

    private _getProfileData(): void {
        let role: string;
        role = this._cookieService.get('role');
        if (role === 'coach') {

            this._getCoatch();
        }
        else {
            this._getClient();
        }
    }
    get isIncludeProfile(): boolean {
        return (this.router.url).search('/profile') > -1 || this.router.url === '/edit-profile' ? true : false;
    }
}