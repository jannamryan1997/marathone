import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PropertyModal } from 'src/app/com/annaniks/marathon/core/modals';
import { FeedResponseData, Content } from 'src/app/com/annaniks/marathon/core/models';


import * as moment from 'moment'
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/com/annaniks/marathon/core/services/user.service';

@Component({
    selector: "app-feed-post-card-item",
    templateUrl: "feed-post-card-item.component.html",
    styleUrls: ["feed-post-card-item.component.scss"]
})

export class FeedPostCardItemComponent implements OnInit {

    @Input() feedItem: FeedResponseData;
    public showTitle: boolean = false;
    public isOpen: boolean = false;
    public content;
    public time: string;
    public seeMore: boolean = false;
    public role: string;
    public localImage: string = "/assets/images/img2.png";
    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]

    constructor(private _matDialog: MatDialog, private _cookieService: CookieService, private _userService: UserService) {
        this.role = this._cookieService.get('role');


    }

    ngOnInit() {
        console.log(this.feedItem);

        this.time = moment(this.feedItem.timeStamp).fromNow();

        if (this.feedItem.feed_media && this.feedItem.feed_media.length) {
            this.content = this.feedItem.feed_media[0].content;
        }
        if (!this.role) {
            if (this.feedItem.creator_info && this.feedItem.creator_info.avatar === null) {
                this.localImage = 'http://annaniks.com:6262/media/' + this.feedItem.creator_info.avatar;
            }else{
                this.localImage = '/assets/images/img2.png';
            }
        }
        if ( this.feedItem.creator_info && this.feedItem.creator_info.avatar === null) {
            this.localImage = '/assets/images/img2.png';
        }
        if (this.role) {
            this.localImage = 'http://annaniks.com:6262/media/' + this._userService.user.data.avatar;
        }


        this._showseeMore();

    }

    private _showseeMore(): void {
        if (this.feedItem.title) {
            let titleLength: number;
            titleLength = this.feedItem.title.length;
            if (titleLength > 100) {
                this.seeMore = true;
            }
            else {
                this.seeMore = false;
            }
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
                data: this.feedItem,
                localImage: this.localImage
            }
        })
    }

    public openPropertyModalByVideo(): void {
        const dialogRef = this._matDialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "100vw",
            height: "100vh",
            data: {
                data: this.feedItem,
                localImage: this.localImage
            }
        })
    }
    public onClickOpen($event): void {
        this.isOpen = $event;
    }
}