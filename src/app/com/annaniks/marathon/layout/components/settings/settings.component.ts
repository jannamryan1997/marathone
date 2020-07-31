import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { takeUntil, map } from 'rxjs/operators';
import { FeedLikeService } from '../../../core/services/feed-like.service';
import { Subject } from 'rxjs';

@Component({
    selector: "app-settings",
    templateUrl: "settings.component.html",
    styleUrls: ["settings.component.scss"]
})

export class SettingsComponent implements OnInit {
    public isOpen: boolean = false;
    public role: string;
    public feed;
    public message: string;
    private unsubscribe$ = new Subject<void>()

    @Input() type: string;
    @Output() openChanges = new EventEmitter();
    @Output() showFollowModel = new EventEmitter();
    @Input('feed')
    set setFeed($event) {
        this.feed = $event
    }
    @Input('role')
    set setRole($event: string) {
        this.role = $event;
    }
    @Output('getButtonsType') _buttonsType = new EventEmitter();

    constructor(private _feedLikeService: FeedLikeService) { }

    ngOnInit() { }

    public onClickOpenComments(): void {
        this.isOpen = !this.isOpen;
        this.openChanges.emit(this.isOpen);
    }
    public clickOnButton(type: string): void {
        if (this.role) {
            if (type == 'like') {
                this._feedLikeService.likeFeed(this.feed.id).pipe(takeUntil(this.unsubscribe$),
                    map(() => {
                        this._buttonsType.emit(true)
                    })).subscribe()
            }
        } else {
            this._buttonsType.emit(false)
        }
        if (type === 'reposts') {
            this.message = "repost";
        }

    }
    public onClichShowFollowModal(): void {
        this.showFollowModel.emit(true);
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}