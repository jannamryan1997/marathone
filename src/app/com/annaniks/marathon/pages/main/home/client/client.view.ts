import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-client",
    templateUrl: "client.view.html",
    styleUrls: ["client.view.scss"]
})

export class ClientView implements OnInit {
    public showTitle: boolean;
    public tab: number = 1;
    public galerryTab: number = 1;
    public reviewItem = [{}, {}, {}, {}, {}]
    
    constructor() { }

    ngOnInit() { }
    public onClickSeeMore(): void {
        this.showTitle = !this.showTitle;
    }
    public onClickTab(tab): void {
        this.tab = tab;

    }
    public onClickGalerryTab(tab): void {
        console.log(tab);
        
        this.galerryTab = tab;
    }
}