import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeedResponseData } from '../../models';

import * as moment from 'moment';
import { CookieBackendService, CookieService } from 'ngx-cookie';
@Component({
    selector: "app-property",
    templateUrl: "property.component.html",
    styleUrls: ["property.component.scss"]
})

export class PropertyModal implements OnInit {
    public show: boolean = false;
    public isOpen: boolean = false;
    public seeMore: boolean = false;
    public timeStamp: string;
    public content: any;
    public feedItem: FeedResponseData;
    public feedTitle: string;
    public role: string;
    public localImage:string;
    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]
    constructor(@Inject(MAT_DIALOG_DATA) private _data,
        private _dialogRef: MatDialogRef<PropertyModal>,
        private _cookieService: CookieService,
        @Inject("FILE_URL") public fileUrl: string
    ) {
        this.feedItem = _data.data;
        this.localImage=this._data.localImage;
        this.timeStamp = moment(this.feedItem.timeStamp).fromNow();
        this.role = this._cookieService.get('role')


    }

    ngOnInit() {
        if (this.feedItem.feed_media && this.feedItem.feed_media.length) {
            this.content = this.feedItem.feed_media[0].content;
        }
        this._showseeMore();
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


    public onClickOpen($event): void {
        this.isOpen = $event;
    }

    public closeModal(): void {
        this._dialogRef.close();
    }
}