import { Component } from "@angular/core";
import { Subject } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { ProfileService } from '../../../core/services/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Familiar } from '../../../core/models/user';

@Component({
    selector: 'app-suggestions-user-list-view',
    templateUrl: 'suggestions-user-list.view.html',
    styleUrls: ['suggestions-user-list.view.scss']
})
export class SuggestionnsUserListViewComponent {
    public followItem: Familiar[] = [];
    private unsubscribe$ = new Subject<void>()

    constructor(private _profileUserService: UserService,
        private _profileService: ProfileService) {
    }

    ngOnInit() {
        this._getFamiliarList()
    }
    public getUser() {
        this._getFamiliarList()
    }
    private _getFamiliarList() {
        let userId = this._profileUserService.user && this._profileUserService.user.data ? this._profileUserService.user.data.user.id : null;
        if (userId) {
            this._profileService.getFamiliarList(userId).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
                data.client = data.client.map((el) => {
                    return Object.assign({}, el, { role: 'client' })
                })
                data.coach = data.coach.map((el) => {
                    return Object.assign({}, el, { role: 'coach' })
                })
                this.followItem = [...data.client, ...data.coach];
            })
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}