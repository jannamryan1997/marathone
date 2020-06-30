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
    public role: string;
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
    ) {
        this.feedItem = _data.data;
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
        titleLength = this.feedItem.title.length;

        if (titleLength > 100) {
            this.seeMore = true;
        }
        else {
            this.seeMore = false;
        }
    }

    public onClickSeeMore(): void {
        this.show = !this.show;
    }
    public onClickOpen($event): void {
        this.isOpen = $event;
    }

    public closeModal(): void {
        this._dialogRef.close();
    }
}