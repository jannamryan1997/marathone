import { Component, Input, Inject, Output, EventEmitter } from "@angular/core";
import { ProfileService } from '../../core/services/profile.service';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Familiar } from '../../core/models/user';

@Component({
    selector: 'app-user-item',
    templateUrl: 'user-item.component.html',
    styleUrls: ['user-item.component.scss']
})
export class UserItemComponent {
    private unsubscribe$ = new Subject<void>()

    public item: Familiar;
    private _role: string;
    private _defaultImage: string = '/assets/images/user-icon-image.png'
    @Input('item')
    set setItem($event: Familiar) {        
        this.item = $event
    }

    @Output('getUser') private _getUser = new EventEmitter()
    @Input('type') public type: string;
    constructor(@Inject('FILE_URL') public fileURL, private _profileService: ProfileService, private _cookieService: CookieService,
        private _userService: UserService) {
        this._role = this._cookieService.get('role')
    }

    public follow() {
        if (!this.item.is_follower) {
            this._profileService.follow(this._role, this._userService.user.data.url, this.item.role, this.item.url).pipe(takeUntil(this.unsubscribe$))
                .subscribe(() => { this._getUser.emit(true) });
        } else {
            if (this.item.is_follower_id) {
                this._profileService.unfollow(this.item.is_follower_id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => { this._getUser.emit(true) });
            }
        }
    }
    public getAvatar() {

        if (this.item && this.item.avatar) {
            return this.fileURL + this.item.avatar
        } else {
            return this._defaultImage
        }
    }
    public getLinkUrl(){
        return `/profile/${this.item.slug}/${this.item.role}`
    }
}