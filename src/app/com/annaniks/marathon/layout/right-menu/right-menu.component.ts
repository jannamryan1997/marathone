import { Component, OnInit } from "@angular/core";
import { ContactItem, FollowItem } from '../../core/models';

@Component({
    selector: "app-right-menu",
    templateUrl: "right-menu.component.html",
    styleUrls: ["right-menu.component.scss"]
})

export class RightMenuComponent implements OnInit {
    public contactItem: ContactItem[] = [
        { image: "assets/images/user.png", name: "Olivie Gipson" },
        { image: "assets/images/user.png", name: "Olivie Gipson" },
        { image: "assets/images/user.png", name: "Olivie Gipson" },
        { image: "assets/images/user.png", name: "Olivie Gipson" },
        { image: "assets/images/user.png", name: "Olivie Gipson" },
        { image: "assets/images/user.png", name: "Olivie Gipson" },
        { image: "assets/images/user.png", name: "Olivie Gipson" },
        { image: "assets/images/user.png", name: "Olivie Gipson" },
    ]
    public followItem:FollowItem[]=[
        { image: "assets/images/user.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/user.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/user.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/user.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
        { image: "assets/images/user.png", name: "Olivie Gipson",email:"@oliviegipson" }, 
    ]
    constructor() { }

    ngOnInit() { }
}