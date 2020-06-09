import { Component, OnInit } from "@angular/core";

@Component({
    selector: "home-view",
    templateUrl: "home.view.html",
    styleUrls: ["home.view.scss"]
})

export class HomeView implements OnInit {
   
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
  
    constructor() { }

    ngOnInit() { }



  

    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }

}
