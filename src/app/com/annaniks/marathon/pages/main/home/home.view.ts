import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "home-view",
    templateUrl: "home.view.html",
    styleUrls: ["home.view.scss"]
})

export class HomeView implements OnInit {
    public router: string;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public showProfile: boolean = false;

    constructor(private _router: Router) {
      
        
    }

    ngOnInit() { 
        this.router=this._router.url;
        console.log(this.router);
    }

    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }

    public reloadProfile() {
        this.showProfile = !this.showProfile;
    }

    public onClickEditProfile():void{
        if(this.router==='/home/coach'){
            this._router.navigate(['/home/coach/profile'])
        }
        else if(this.router==='/home/user'){
            this._router.navigate(['/home/user/profile'])
        }
    }
}
