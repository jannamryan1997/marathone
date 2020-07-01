import { Component, OnInit } from "@angular/core";
import { FeedService } from '../feed.service';
import { FeedData, FeedResponseData } from '../../../../core/models';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: "feed-posts-view",
    templateUrl: "feed-posts.view.html",
    styleUrls: ["feed-posts.view.scss"]
})

export class FeedPostsView implements OnInit {
    public fullScreenLoader: boolean = false;
    public feedItem: FeedResponseData[];
    public content: any;
    constructor(public _feedService: FeedService, public userService: UserService) { }

    ngOnInit() {
        this._getFeed();
    }

    // private _getFeed(): void {
    //     this.fullScreenLoader = true;
    //     this._feedService.feed()
    //         .subscribe((data: FeedData) => {
    //             this.feedItem = data.results;
    //             this.fullScreenLoader = false;
    //         },
    //             error => {
    //                 this.fullScreenLoader = false;
    //             }
    //         )
    // }
    private _getFeed(): void {
        this.fullScreenLoader = true;
        this._feedService.feed()
            .subscribe((data: FeedData) => {
                this.feedItem = data.results;
                for (let item of this.feedItem) {
                    for (let media of item.feed_media) {
                        console.log(media.content)
                        media.content = JSON.parse(media.content)
                    }
                    console.log(data,"ssssssssssssssssssssss");
                      this.fullScreenLoader =false;
                }
             
                
               
            },
                error => {
                this.fullScreenLoader =false;
                }
            )
    }

    public onPostCreated(): void {
        this._getFeed();
    }
}
