import { Component, OnInit } from "@angular/core";

@Component({
    selector: "home-view",
    templateUrl: "home.view.html",
    styleUrls: ["home.view.scss"]
})

export class HomeView implements OnInit {
    public showTitle: boolean;
    public tab: number = 1;
    public galerryTab: number = 1;
    public openReview:boolean=false;
    public reviewItem = [{}, {}, {}, {}, {}]
    constructor() { }

    ngOnInit() { }


    public onClickSeeMore(): void {
        this.showTitle = !this.showTitle;
    }
    public onClickTab(tab): void {
        this.tab = tab;
        if(this.tab===4){
            this.openReview = !this.openReview; 
        }
        else{
            this.openReview =false;
        }

    }
    public onClickGalerryTab(tab): void {
        this.galerryTab = tab;
    }
    public onClickShowTotalReview():void{
            this.openReview = !this.openReview;
    }

}
