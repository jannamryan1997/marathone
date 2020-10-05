import { Component, Input, Inject, Output, EventEmitter } from "@angular/core";
import { ProfileService } from '../../core/services/profile.service';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Familiar } from '../../core/models/user';
import { FollowService } from '../../core/services/follow.service';
import { AppService } from '../../core/services/app.service';

@Component({
    selector: 'app-user-item',
    templateUrl: 'user-item.component.html',
    styleUrls: ['user-item.component.scss']
})
export class UserItemComponent {
    private unsubscribe$ = new Subject<void>()
    public items: Familiar[] = [];
    private _role: string;
    private _defaultImage: string = '/assets/images/user-icon-image.png'
    @Input('item')
    set setItem($event: Familiar[]) {
        this.items = $event
    }

    @Output('getUser') private _getUser = new EventEmitter()
    @Input('type') public type: string;
    constructor(@Inject('FILE_URL') public fileURL,
        private _followService: FollowService,
        private _cookieService: CookieService,
        private _appService: AppService,
        private _userService: UserService) {
        this._role = this._cookieService.get('role');
    }

    ngOnInit() {
        this._followService.getFollowState().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
            if (data) {
                this._followService.changeFollowStateValue(false);
                this._getUser.emit(true);
            }
        })
    }
    public follow(item: Familiar) {
        this._followService.follow(item, this._role, this._userService.user.data.url, item.role, item.url)
            .pipe(takeUntil(this.unsubscribe$)).subscribe()
    }
    public getAvatar(item: Familiar) {
        return this._appService.setLocalImage(item.avatar)
        // if (item && item.avatar) {
        //     return this.fileURL + item.avatar
        // } else {
        //     return this._defaultImage
        // }
    }
    public getLinkUrl(item: Familiar) {
        return `/profile/${item.slug}/${item.role}`
    }
}