import { Component, OnInit, OnDestroy } from "@angular/core";
import { FeedService } from '../feed.service';
import { FeedResponseData } from '../../../../core/models';
import { UserService } from '../../../../core/services/user.service';
import { Subject } from 'rxjs';
import { RemoveModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: "feed-posts-view",
    templateUrl: "feed-posts.view.html",
    styleUrls: ["feed-posts.view.scss"],
})

export class FeedPostsView implements OnInit, OnDestroy {
    private _pageIndex = 1
    private _isCountCalculated = false;
    private _pagesCount: number;
    private _unsubscribe = new Subject<void>();
    public feedItem: FeedResponseData[] = [];
    public content: any;
    public throttle = 300;
    public scrollDistance = 1;
    public scrollUpDistance = 2;
    public infiniteScrollDisabled = false;
    public loading: boolean = false;
    constructor(
        public _feedService: FeedService,
        public userService: UserService,
        private _dialog: MatDialog,
    ) { }

    ngOnInit() {
        this._getFeed(this._pageIndex);
    }


    private async _getFeed(page: number) {
        this.infiniteScrollDisabled = true;
        const data = await this._feedService.feed(this._pageIndex)
            .toPromise()
        if (this.feedItem.length === 0) {
        }
        if (!this._isCountCalculated) {
            this._pagesCount = Math.ceil(data.count / 10);
            this._isCountCalculated = true;
        }
        if (this._pageIndex > this._pagesCount) {
            return;
        }

        this.feedItem.push(...data.results);
        this._pageIndex++;
        for (let item of this.feedItem) {
            for (let media of item.feed_media) {
                if (typeof media.content == 'string') {
                    media.content = JSON.parse(media.content)
                }
            }
        }
        this.infiniteScrollDisabled = false;
    }

    public onPostCreated(event): void {
        this._pageIndex = 1;
        this._isCountCalculated = false;
        this._pagesCount = 0;
        this.feedItem = [];
        this._getFeed(this._pageIndex);

    }

    public async onScroll() {
        if (this._pageIndex > this._pagesCount) {
            return;
        }
        this._getFeed(this._pageIndex);
    }


    public deletedFeedItem(event): void {
        if (event) {
            const dialogRef = this._dialog.open(RemoveModal, {
                width: "400px"
            })
            dialogRef.afterClosed().subscribe((data) => {
                if (data === "deleted") {
                    this._feedService.deleteFeed(event).subscribe((data) => {
                        this._pageIndex = 1;
                        this._isCountCalculated = false;
                        this._pagesCount = 0;
                        this.feedItem = [];
                        this._getFeed(this._pageIndex)
                    })
                }

            })
        }

    }

    public onClickEditFeed(event):void{
      if(event){
        this._getFeed(this._pageIndex);
        console.log(event);
        
      } 
       
    }

    ngOnDestroy() {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
