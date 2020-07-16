import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FeedService } from '../feed.service';
import { CookieService } from 'ngx-cookie';
import { FeedResponseData } from '../../../../core/models';

import * as moment from 'moment';
import { ReceiptResponseData, ReceiptData } from '../../../../core/models/receipt';
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
    public time: string;
    public receipt:ReceiptResponseData;
    public slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]
    constructor(private _activatedRoute: ActivatedRoute, private _feedService: FeedService, private _cookieService: CookieService) {
        this._activatedRoute.params.subscribe((params) => {
            this.feedId = Number(params.id);
            this.role = this._cookieService.get('role');
        })
    }

    ngOnInit() {
        this._getFeedById();
    }


    private _getFeedById(): void {
        this._feedService.getFeedById(this.feedId)
            .subscribe((data: FeedResponseData) => {
                this.feedItem = data;
                this.time = moment(this.feedItem.timeStamp).format('MMMM Do YYYY');
                for (let item of data.feed_media) {
                    if (typeof item.content === 'string') {
                        const content: ReceiptData = JSON.parse(item.content);
                        item.content = content;
                        console.log(content);
                        if (content && content.receipt) {
                            this.receipt = content.receipt;
                        }
                    }
                    console.log(this.receipt);
                }
            })
    }


    public onClickOpen($event): void {
        this.isOpen = $event;
    }

}