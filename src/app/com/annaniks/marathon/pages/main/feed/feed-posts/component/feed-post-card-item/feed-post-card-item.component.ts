import { Component, OnInit, Input, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PropertyModal } from 'src/app/com/annaniks/marathon/core/modals';
import { FeedResponseData } from 'src/app/com/annaniks/marathon/core/models';
import * as moment from 'moment'
import { CookieService } from 'ngx-cookie';
import { UserService } from 'src/app/com/annaniks/marathon/core/services/user.service';
import { FeedService } from '../../../feed.service';
import { ReceiptResponseData } from 'src/app/com/annaniks/marathon/core/models/receipt';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: "app-feed-post-card-item",
    templateUrl: "feed-post-card-item.component.html",
    styleUrls: ["feed-post-card-item.component.scss"],

})

export class FeedPostCardItemComponent implements OnInit {
    @Input() feedItem: FeedResponseData;
    @Output() deletedItem = new EventEmitter<any>();
    public showTitle: boolean = false;
    public isOpen: boolean = false;
    public content;
    public time: string;
    public seeMore: boolean = false;
    public role: string;
    public feedTitle: string;
    public videoSources = [];
    public receptvideoSources = [];
    public receipt: ReceiptResponseData;
    public localImage: string = "/assets/images/user-icon-image.png";
    public showDeleteModal: boolean = false;
    public slideConfig = {};
    public comments = [
        {
            image: "assets/images/chicken.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/chicken.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/chicken.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]

    constructor(
        @Inject("FILE_URL") public fileUrl,
        private _matDialog: MatDialog,
        private _fb: FormBuilder,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _feedService: FeedService) {
        this.role = this._cookieService.get('role');
        this.slideConfig = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000
        }

    }

    ngOnInit() {
        this.time = moment(this.feedItem.timeStamp).fromNow();
        if (this.feedItem.feed_media && this.feedItem.feed_media.length) {
            this.content = this.feedItem.feed_media[0].content;
            this.receipt = this.content.receipt;
        }

        if (this.content.type === "videoLink") {
            this.videoSources = [{
                src: this.content.url,
                provider: 'youtube',
            }]
        }
        if (this.content.type === "recipeType") {
            this.receptvideoSources = [{
                src: this.receipt.videoLink,
                provider: 'youtube',
            }]
        }

        if (!this.role) {
            if (this.feedItem.creator_info && this.feedItem.creator_info.avatar) {
                this.localImage = this.fileUrl + this.feedItem.creator_info.avatar;
            }

            else if (this.feedItem.creator_client_info && this.feedItem.creator_client_info.avatar) {
                this.localImage = this.fileUrl + this.feedItem.creator_client_info.avatar;
            }
            else {
                this.localImage = '/assets/images/user-icon-image.png';
            }
        }

        else if (this.role && this._userService.user && this._userService.user.data && this._userService.user.data.avatar) {
            this.localImage = this.fileUrl + this._userService.user.data.avatar;
        }
        else if (this.role && (!this._userService.user || (this._userService.user && !this._userService.user.data) || this._userService.user.data.avatar === null)) {
            this.localImage = "/assets/images/user-icon-image.png";
        }
        this._showseeMore();
    }
    public likeOrDislike(event,item){      
        
    }
    
    private _showseeMore(): void {
        let titleLength: number;
        if (this.feedItem.title) {
            titleLength = this.feedItem.title.length;
            this.feedTitle = this.feedItem.title;
            if (titleLength > 100) {
                this.seeMore = true;
                this.feedTitle = this.feedItem.title.slice(0, 100);
            }
            else {
                this.seeMore = false;
            }
        }


    }

    public onClickSeeMore(): void {
        this.feedTitle = this.feedItem.title.slice(0, this.feedItem.title.length);
        this.seeMore = false;
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
    public getButtonsType(event: string) {
        if (event) {
            if (event == 'like') {
                console.log(event);

            }
        }

    }
    public sendMessage($event) {
        this.comments.push({
            image: "assets/images/img.4.png",
            chiled: [],
            dislike: "0",
            like: "0",
            message: $event,
            name: "gevorg gevorgyan",
            time: "1 minute ago",
            view: "1"
        })

    }
    public setImage() {
        return this.content.cover ? this.fileUrl + this.content.cover : 'assets/images/chicken.png'
    }
    public onClickOpen($event): void {
        this.isOpen = $event;
    }

    public showDeletedModal(): void {
        this.showDeleteModal = !this.showDeleteModal;
    }
    
    public deleteFeedItem(event) {
        if (event) {
            this.deletedItem.emit(this.feedItem.id);
        }
    }

}


