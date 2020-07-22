import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FeedLikeService } from '../../../core/services/feed-like.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FollowCommentService } from '../../../core/services/follow-comment.service';

@Component({
    selector: "app-settings",
    templateUrl: "settings.component.html",
    styleUrls: ["settings.component.scss"]
})

export class SettingsComponent implements OnInit {
    public isOpen: boolean = false;
    public role: string;
    public feed;
    private unsubscribe$ = new Subject<void>();
    @Input() type: string;
    @Output() openChanges = new EventEmitter();
    @Input('feed')
    set setFeed($event) {
        this.feed = $event
    }
    @Input('role')
    set setRole($event: string) {
        this.role = $event;
    }
    @Output('getButtonsType') _buttonsType = new EventEmitter();
    constructor(private _feedLikeService: FeedLikeService,
        private _followService: FollowCommentService) { }

    ngOnInit() { }

    public onClickOpenComments(): void {
        this.isOpen = !this.isOpen;
        this.openChanges.emit(this.isOpen);
    }
    public clickOnButton(type: string): void {        
        if (this.role) {
            if (type == 'like') {                
                this._feedLikeService.likeFeed(this.feed.id).pipe(
                    takeUntil(this.unsubscribe$),
                    map(() => {
                        this._followService.onLike(true)
                    }))
                    .subscribe()

            }
        } else {
            this._followService.onLike(false)
        }

    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

