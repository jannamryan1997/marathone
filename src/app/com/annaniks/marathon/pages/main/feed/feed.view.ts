import { Component, OnInit } from "@angular/core";
import { FeedService } from './feed.service';

@Component({
    selector: "feed-view",
    templateUrl: "feed.view.html",
    styleUrls: ["feed.view.scss"]
})

export class FeedView implements OnInit {

    constructor(public _feedService: FeedService) { }

    ngOnInit() {
        this._getFeed();
     }

    private _getFeed(): void {
        this._feedService.feed()
            .subscribe((data) => {
                // console.log(data,"feeeeeddddddd");

            },
                error => {
                    // console.log(error);

                }
            )
    }

}