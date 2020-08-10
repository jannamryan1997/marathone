import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class FollowService {
    private _isFollowed = false;
    public followEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private _profileService: ProfileService) { }

    public getFollowState(): Observable<boolean> {
        return this.followEvent$.asObservable();
    }
    public changeFollowStateValue(value: boolean) {
        this.followEvent$.next(value);
    }
    public follow(user, role, myUrl, userRole, userUrl) {
        if (!user.is_follower) {
            return this._profileService.follow(role, myUrl, userRole, userUrl).pipe(
                map(() => {
                    this.changeFollowStateValue(true);
                    return true;
                }))
        } else {
            if (user.is_follower_id) {
                return this._profileService.unfollow(user.is_follower_id).pipe(
                    map(() => {
                        this.changeFollowStateValue(true);
                        return true;
                    }))
            }
        }
    }
}