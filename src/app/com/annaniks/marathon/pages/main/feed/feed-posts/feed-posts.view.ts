import { Component, OnInit } from "@angular/core";
import { FeedService } from '../feed.service';
import { FeedData, FeedResponseData } from '../../../../core/models';

@Component({
    selector: "feed-posts-view",
    templateUrl: "feed-posts.view.html",
    styleUrls: ["feed-posts.view.scss"]
})

export class FeedPostsView implements OnInit {
    public feedItem: FeedResponseData[];
    public content: any;
    constructor(public _feedService: FeedService) { }

    ngOnInit() {
        this._getFeed();
    }

    private _getFeed(): void {
        this._feedService.feed()
            .subscribe((data: FeedData) => {
                this.feedItem = data.results;
                for (let item of this.feedItem) {
                    for (let media of item.feed_media) {
                        media.content = JSON.parse(media.content)
                    }
                }
                
            },
                error => {

                }
            )
    }

    public onPostCreated(): void {
        this._getFeed();
    }
}
