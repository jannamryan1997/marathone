import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MenuItem } from '../../core/models';

@Component({
    selector: "app-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"]
})

export class HeaderComponent implements OnInit {
    public menuItem: MenuItem[] = [
        { routerLink: "/feed", title: "Feed" },
        { routerLink: "#", title: "Coaches" },
        { routerLink: "#", title: "Recipes" },
        { routerLink: "#", title: "Workouts" },
        { routerLink: "#", title: "Articels" },
        { routerLink: "#", title: "Q & A" },
        { routerLink: "#", title: "Transform" },
        { routerLink: "#", title: "Workout Music" },
    ]
    constructor() { }

    ngOnInit() { }
    }

