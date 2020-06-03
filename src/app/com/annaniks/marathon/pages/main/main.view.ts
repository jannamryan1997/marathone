import { Component, OnInit } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: "main-view",
    templateUrl: "main.view.html",
    styleUrls: ["main.view.scss"]
})

export class MainView implements OnInit {
    public token: string;
    constructor(private _cookieService: CookieService) {
       this.token= this._cookieService.get('token');
    }

    ngOnInit() { }


}