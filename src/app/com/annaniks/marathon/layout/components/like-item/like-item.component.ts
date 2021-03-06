import { Component, OnInit, OnDestroy, Input, Inject } from "@angular/core";
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../../core/services/user.service';
import { ProfileService } from '../../../core/services/profile.service';
import { map, takeUntil, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { FollowService } from '../../../core/services/follow.service';


@Component({
    selector: "app-like-item",
    templateUrl: "like-item.component.html",
    styleUrls: ["like-item.component.scss"]
})

export class LiketemComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();
    public isFollowed: boolean = false;
    public user;
    public localImage: string = "assets/images/user-icon-image.png";
    public user_first_name: string;
    public userId: number;
    public userRole: string;
    public userSlug: string;
    public role: string;
    public likeItem;
    public followId: number;
    @Input('likeItem')
    set setLikeItem($event) {
        this.likeItem = $event;
        if (this.likeItem) {
            this.userRole = this.likeItem.coach ? 'coach' : 'client';
            this._getProfileById().subscribe()

        }
    }
    constructor(
        @Inject('FILE_URL') private _fileUrl,
        private _userService: UserService,
        private _profileService: ProfileService,
        private _cookieService: CookieService,
        private _followService: FollowService
    ) {
        this.role = this._cookieService.get('role');
        this.user = this._userService.user.data;
        this.userId = this.user.id;
        this.userSlug = this.user.slug;
    }

    ngOnInit() {
        if (this.likeItem.liked_coach === null) {///////coach e
            if(this.likeItem.liked_user.avatar){
                this.localImage = this._fileUrl + this.likeItem.liked_user.avatar;
            }
         
            this.user_first_name = this.likeItem.liked_user.user.first_name;
            this.followId = this.likeItem.liked_user.id;
        }
        else {////clent e
            if(this.likeItem.liked_coach.avatar){
                this.localImage = this._fileUrl + this.likeItem.liked_coach.avatar;
            }
         
            this.user_first_name = this.likeItem.liked_coach.user.first_name;
            this.followId = this.likeItem.liked_coach.id;
        }
    }


    private _getProfileById() {
        let id;
        if (this.likeItem.liked_coach === null) {
            id = this.likeItem.liked_user.id;
        }
        else {
            id = this.likeItem.liked_coach.id;
        }
        return this._profileService.getfollowProfileById(this.userRole, id).pipe(takeUntil(this.unsubscribe$),
            map((data) => {
                this.user = data;
                this.isFollowed = this.user.is_follower;
            }))
    }

    public follow() {
        this._followService.follow(this.user, this.role, this._userService.user.data.url, this.userRole, this.user.url)
            .pipe(takeUntil(this.unsubscribe$),
                switchMap((data) => {
                    return this._getProfileById()
                })).subscribe()
    }

    ngOnDestroy() { }
}