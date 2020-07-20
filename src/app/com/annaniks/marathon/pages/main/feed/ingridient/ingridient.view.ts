import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FeedService } from '../feed.service';
import { CookieService } from 'ngx-cookie';
import { FeedResponseData } from '../../../../core/models';

import * as moment from 'moment';
import { ReceiptResponseData } from '../../../../core/models/receipt';

import { Location } from '@angular/common';

@Component({
    selector: "ingridient-view",
    templateUrl: "ingridient.view.html",
    styleUrls: ["ingridient.view.scss"]
})

export class IngridientViewComponent implements OnInit {
    public feedItem: FeedResponseData;
    public feedId: number;
    public role: string;
    public isOpen: boolean = false;
    public receptvideoSources = [];
    public time: string;
    public receipt: ReceiptResponseData;
    public loading: boolean = false;
    public slideConfig = {};
    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _feedService: FeedService,
        private _cookieService: CookieService,
        private _location: Location,
    ) {
        this._activatedRoute.params.subscribe((params) => {
            this.feedId = Number(params.id);
            this.role = this._cookieService.get('role');
        })
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
        this._getFeedById();
    }


    private _getFeedById(): void {
        this.loading = true;
        this._feedService.getFeedById(this.feedId)
            .subscribe((data: FeedResponseData) => {
                this.feedItem = data;
                this.loading = false;

                this.time = moment(this.feedItem.timeStamp).format('MMMM Do YYYY');
                for (let item of data.feed_media) {
                    if (typeof item.content === 'string') {
                        const content = JSON.parse(item.content);
                        item.content = content;
                        if (content && content.receipt) {
                            this.receipt = content.receipt;
                            this.receptvideoSources = [{
                                src: this.receipt.videoLink,
                                provider: 'youtube',
                            }]
                        }
                    }
                }
            },
                err => {
                    this.loading = false;
                }
            )
    }


    public onClickOpen($event): void {
        this.isOpen = $event;
    }

    public onClickGotoBack() {
        this._location.back();
    }
}