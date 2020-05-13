import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MenuItem } from '../../core/models';

@Component({
    selector: "app-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.scss"]
})

export class HeaderComponent implements OnInit {
    @ViewChild('navbar') private _navbarElement: ElementRef;
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

    ngOnInit() { 
        this._handleScrollPositionChange();
    }


    private _handleScrollPositionChange() {
     
            document.addEventListener('scroll', () => {
                if (window.scrollY >= 1) {
                    this._navbarElement.nativeElement.classList.add('fixed');
                }
                else {
                    this._navbarElement.nativeElement.classList.remove('fixed');
                }
            })
        }
    }

