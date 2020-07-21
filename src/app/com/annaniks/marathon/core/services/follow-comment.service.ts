import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FollowCommentService {
    private _commentSubject = new Subject<{ isSend: boolean, isParent?: any, isCombine?: boolean, isAuthorizated: boolean }>();
    private _commentState = this._commentSubject.asObservable();

    private _likeSubject = new Subject<{ isSend: boolean, isParent?: any, isCombine?: boolean, isAuthorizated: boolean }>();
    private _likeState = this._likeSubject.asObservable();

    public onComment(isParent, isCombine: boolean, isAuthorizated: boolean=false) {
        this._commentSubject.next({ isSend: true, isParent: isParent, isCombine: isCombine, isAuthorizated: isAuthorizated })
    }
    public getState() {
        return this._commentState
    }
}