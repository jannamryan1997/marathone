import { Component, OnInit, Inject } from "@angular/core";
import { FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FeedResponseData } from '../../../../core/models';
import { CookieService } from 'ngx-cookie';
import * as moment from 'moment';

@Component({
    selector: "combination-view",
    templateUrl: "combination.view.html",
    styleUrls: ["combination.view.scss"]
})

export class CombinationView implements OnInit {
    public isOpen: boolean = false;
    private _articleId: number;
    private unsubscribe$ = new Subject<void>()
    public comments = [];
    public article: FeedResponseData;
    public content;
    public role: string;
    public time;
    constructor(private _feedService: FeedService, private _activatedRoute: ActivatedRoute,
        private _cookieService: CookieService,
        @Inject("FILE_URL") public fileUrl: string) {
        this.role = this._cookieService.get('role');

        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this._articleId = params.id;
        })
    }

    ngOnInit() {
        this._getArticleById();
    }

    private _getArticleById() {
        this._feedService.getFeedById(this._articleId).pipe(takeUntil(this.unsubscribe$)).subscribe((data: FeedResponseData) => {
            this.article = data;
            this.time = moment(this.article.timeStamp).format('MMMM Do YYYY');
            if (this.article && this.article.feed_media && this.article.feed_media[0] && this.article.feed_media[0].content) {
                this.content = JSON.parse(this.article.feed_media[0].content);
            }
        })
    }

    public onClickOpen($event): void {
        this.isOpen = $event;
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}