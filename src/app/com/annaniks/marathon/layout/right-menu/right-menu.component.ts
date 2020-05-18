import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ContactItem, FollowItem } from '../../core/models';

@Component({
    selector: "app-right-menu",
    templateUrl: "right-menu.component.html",
    styleUrls: ["right-menu.component.scss"]
})

export class RightMenuComponent implements OnInit {
    @ViewChild('navbar') private _navbarElement: ElementRef;
    public contactItem: ContactItem[] = [
        { image: "assets/images/img1.png", name: "Olivie Gipson" },
        { image: "assets/images/img2.png", name: "Olivie Gipson" },
        { image: "assets/images/img1.png", name: "Olivie Gipson" },
        { image: "assets/images/img.4.png", name: "Olivie Gipson" },
        { image: "assets/images/img5.png", name: "Olivie Gipson" },
        { image: "assets/images/img6.png", name: "Olivie Gipson" },
        { image: "assets/images/img7.png", name: "Olivie Gipson" },
        { image: "assets/images/img8.png", name: "Olivie Gipson" },
    ]
    public followItem:FollowItem[]=[
        { image: "assets/images/img1.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/img1.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/img1.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/img1.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/img1.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
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