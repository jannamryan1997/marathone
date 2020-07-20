import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../../core/services/user.service';
import { UserResponseData } from '../../../../core/models/user';
import { FeedService } from '../../feed/feed.service';
import { FeedResponseData } from '../../../../core/models';
import { finalize } from 'rxjs/operators';

@Component({
    selector: "app-coach",
    templateUrl: "coach.view.html",
    styleUrls: ["coach.view.scss"]
})

export class CoachView implements OnInit {
    public feedItem: FeedResponseData[] = [];
    public user: UserResponseData;
    public showTitle: boolean;
    public tab: number = 1;
    public postTab: number = 1;
    public galerryTab: number = 1;
    public loading:boolean=false;
    public reviewItem = [{}, {}, {}, {}, {}];
    public scrollDistance = 1;
    public scrollUpDistance = 2;
    public infiniteScrollDisabled = false;
    private _pageIndex = 1
    private _isCountCalculated = false;
    private _pagesCount: number;
    public throttle = 300;


    constructor(private _userService: UserService,private _feedService:FeedService) {
        this.user = this._userService.user;
    }

    ngOnInit() { 
        this._getFeed(this._pageIndex);
    }

    private async _getFeed(page: number) {
        this.loading=true;
        this.infiniteScrollDisabled = true;
        const data = await this._feedService.feed(this._pageIndex)
        .pipe(
            finalize(()=>{
                this.loading=false;
            })
        )
        .toPromise()
        if(this.feedItem.length === 0){
            this.loading=false;
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
      console.log(this.feedItem);   

    }

    public onClickSeeMore(): void {
        this.showTitle = !this.showTitle;
    }
    public onClickTab(tab): void {
        this.tab = tab;

    }
    public onClickGalerryTab(tab): void {
        this.galerryTab = tab;
    }
    public onClickPostEventsTab(tab): void {
        this.postTab = tab;
    }
    public async onScroll() {
        if (this._pageIndex > this._pagesCount) {
            return;
        }
        this._getFeed(this._pageIndex);
    }

    public deletedFeedItem(event): void {
        if (event) {
            this._feedService.deleteFeed(event).subscribe((data) => {
                this._pageIndex = 1;
                this._isCountCalculated = false;
                this._pagesCount = 0;
                this.feedItem = [];
                this._getFeed(this._pageIndex)
            })
        }

    }

}