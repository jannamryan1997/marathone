import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { ActivatedRoute, Router, Route } from '@angular/router';

@Component({
    selector: "feed-view",
    templateUrl: "feed.view.html",
    styleUrls: ["feed.view.scss"]
})

export class FeedView implements OnInit,AfterViewChecked {
    public showRouting: boolean;
    constructor(private _router: Router) {}

    ngOnInit() { }

    ngAfterViewChecked(){
        if (this._router.url === '/feed') {
            this.showRouting = true;
        }
        else{
            this.showRouting = false; 
        }
        console.log(this._router.url);
    }
}