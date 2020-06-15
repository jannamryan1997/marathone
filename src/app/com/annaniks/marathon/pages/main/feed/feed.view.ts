import { Component, OnInit, AfterViewInit, AfterViewChecked } from "@angular/core";
import { FeedService } from './feed.service';
import { Router } from '@angular/router';

@Component({
    selector: "feed-view",
    templateUrl: "feed.view.html",
    styleUrls: ["feed.view.scss"]
})

export class FeedView implements OnInit,AfterViewInit {

    constructor(public _feedService: FeedService) {
       
    }

    ngOnInit() {
        this._getFeed();
    }

    ngAfterViewInit(){
      
    }

    private _getFeed(): void {
        this._feedService.feed()
            .subscribe((data) => {

            },
                error => {

                }
            )
    }

}