import { Component, OnInit } from "@angular/core";

@Component({
    selector: "home-view",
    templateUrl: "home.view.html",
    styleUrls: ["home.view.scss"]
})

export class HomeView implements OnInit {
    public showTitle: boolean;
    public tab: number = 1;
    public reviewItem = [{}, {}, {}, {}, {}]
    constructor() { }

    ngOnInit() { }


    public onClickSeeMore(): void {
        this.showTitle = !this.showTitle;
    }
    public onClickTab(tab): void {
        this.tab = tab;
        console.log(this.tab);

    }
}
