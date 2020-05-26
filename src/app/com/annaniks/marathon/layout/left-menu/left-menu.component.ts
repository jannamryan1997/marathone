import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MenuItem } from '../../core/models';

@Component({
    selector: "app-left-menu",
    templateUrl: "left-menu.component.html",
    styleUrls: ["left-menu.component.scss"]
})

export class LeftMenuCompomemtn implements OnInit {
    public leftMenuItem:MenuItem[]= [
        { routerLink: "/home", title: "Home" },
        { routerLink: "#", title: "Profile" },
        { routerLink: "#", title: "Dashboard" },
        { routerLink: "#", title: "Marathon" },
        { routerLink: "#", title: "My Recips" },
        { routerLink: "#", title: "My Training" },
    ]
    constructor() { }

    ngOnInit() {}
}