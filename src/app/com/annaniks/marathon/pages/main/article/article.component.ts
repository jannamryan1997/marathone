import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "artivle-view",
    templateUrl: "article.view.html",
    styleUrls: ["article.view.scss"]
})

export class ArticleView implements OnInit {

    public showCreatedMenu: boolean = false;
    public showSetting: boolean = false;

    constructor(public router: Router) {
    }

    ngOnInit() { }

    public onClickShowCreatedMenu(): void {
        this.showCreatedMenu = !this.showCreatedMenu;
    }

    public onClickShowSetting(): void {
        this.showSetting = !this.showSetting;
    }
}