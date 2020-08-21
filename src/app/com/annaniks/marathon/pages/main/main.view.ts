import { Component, OnInit } from "@angular/core";
import { UserService } from '../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: "main-view",
    templateUrl: "main.view.html",
    styleUrls: ["main.view.scss"]
})

export class MainView implements OnInit {
    public getmeiD: string;
    public ingridientid: string;
    constructor(
        private _profileUserService: UserService,
        private _cookieService: CookieService,
        public router: Router,
    ) {
    }

    ngOnInit() {
        // this._getProfileData();
    }

    // private _getTokenForChat(role) {
    //     if (!this._cookieService.get('chatToken')) {
    //         let token = this._cookieService.get('access');
    //         return this._profileUserService.getTokenForChat(this._profileUserService.user.data.user.id, role, token).pipe(
    //             map((data) => {
    //                 console.log(data);
    //                 // this._cookieService.put('chatToken',data)
    //                 return data
    //             })
    //         )
    //     }
    // }
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
        return (this.router.url).search('/profile') > -1 || this.router.url === '/edit-profile' || this.router.url==='/article' || this.router.url==='/recipe/recipe-post' ? true : false;
    }
}