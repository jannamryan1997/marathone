import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PropertyModal } from 'src/app/com/annaniks/marathon/core/modals';
import { FeedResponseData, Content } from 'src/app/com/annaniks/marathon/core/models';

// export type PostType = "video" | "text" | "image" | "combinations" | "chicken"

@Component({
    selector: "app-feed-post-card-item",
    templateUrl: "feed-post-card-item.component.html",
    styleUrls: ["feed-post-card-item.component.scss"]
})

export class FeedPostCardItemComponent implements OnInit {
    // @Input('postType') public postType: PostType;
    @Input() feedItem: FeedResponseData;
    public showTitle: boolean = false;
    public isOpen: boolean = false;
    public content;

    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]

    constructor(private _matDialog: MatDialog) { }

    ngOnInit() {
        if (this.feedItem.feed_media && this.feedItem.feed_media.length) {
            this.content = this.feedItem.feed_media[0].content;
            console.log(this.feedItem.feed_media[0].content);
        }


    }



    public onClickSeeMore(): void {
        this.showTitle = !this.showTitle;
    }

    public openPropertyModalByImage(): void {
        const dialogRef = this._matDialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "100vw",
            height: "100vh",
            data: {
                type: 'image',
            }
        })
    }

    public openPropertyModalByVideo(): void {
        const dialogRef = this._matDialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "100vw",
            height: "100vh",
            data: {
                type: 'video',
            }
        })
    }
    public onClickOpen($event): void {
        this.isOpen = $event;
    }



  


}