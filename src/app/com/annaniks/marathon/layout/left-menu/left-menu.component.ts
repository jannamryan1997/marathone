import { Component, OnInit} from "@angular/core";
import { MenuItem } from '../../core/models';
import { AuthService } from '../../pages/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthModal } from '../../core/modals';

@Component({
    selector: "app-left-menu",
    templateUrl: "left-menu.component.html",
    styleUrls: ["left-menu.component.scss"]
})

export class LeftMenuCompomemtn implements OnInit {
    public activeTab: string;
    public leftMenuItem: MenuItem[] = [
        { routerLink: "/home", title: "Home" },
        { routerLink: "#", title: "Profile" },
        { routerLink: "#", title: "Dashboard" },
        { routerLink: "#", title: "Marathon" },
        { routerLink: "#", title: "My Recips" },
        { routerLink: "#", title: "My Training" },
    ]
    constructor(private _cookieService: CookieService, private _router: Router, private _mathDialog: MatDialog) { }

    ngOnInit() { }

    public onClickTab(item, routerLink): void {
   

        if (!this._cookieService.get('token')) {
            this._mathDialog.open(AuthModal, {
                width: "100%",
                maxWidth: "100vw",
            })
        }
        else {
            this.activeTab = item.routerLink;
            this._router.navigate([routerLink]);


        }
    }
}