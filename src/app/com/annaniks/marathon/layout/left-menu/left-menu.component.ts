import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MenuItem } from '../../core/models';

@Component({
    selector: "app-left-menu",
    templateUrl: "left-menu.component.html",
    styleUrls: ["left-menu.component.scss"]
})

export class LeftMenuCompomemtn implements OnInit {
    @ViewChild('navbar') private _navbarElement: ElementRef;
    public leftMenuItem:MenuItem[]= [
        { routerLink: "/home", title: "Home" },
        { routerLink: "#", title: "Profile" },
        { routerLink: "#", title: "Dashboard" },
        { routerLink: "#", title: "Marathon" },
        { routerLink: "#", title: "My Recips" },
        { routerLink: "#", title: "My Training" },
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