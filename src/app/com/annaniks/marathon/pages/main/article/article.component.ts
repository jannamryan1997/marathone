import { Component, OnInit } from "@angular/core";

@Component({
    selector: "artivle-view",
    templateUrl: "artivle.view.html",
    styleUrls: ["artivle.view.scss"]
})

export class ArticleView implements OnInit {
public showCreatedMenu:boolean=false;
public showSetting:boolean=false;

    constructor() { }

    ngOnInit() { }

    public onClickShowCreatedMenu():void{
        this.showCreatedMenu =! this.showCreatedMenu;
    }

    public onClickShowSetting():void{
        this.showSetting =! this.showSetting;
    }
}