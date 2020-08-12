import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _cookieService: CookieService,
    ) {
    }

    canActivate(): Promise<boolean> | Observable<boolean> | boolean {
        const role: string = this._cookieService.get('role');

        switch (role) {
            case 'client': {
                return this._userService.getClient()
                    .pipe(
                        map((data) => {
                            const getmeiD = data.data.id;
                            this._userService.user = data;
                            this._userService.isAuthorized = true;
                            this._cookieService.put('userId', getmeiD);
                            this._getTokenForChat(role).subscribe()
                            return true;
                        }),
                        catchError(() => {
                            this._userService.user = null;
                            this._userService.isAuthorized = false;
                            return throwError(true);
                        })
                    )
            }
            case 'coach': {
                return this._userService.getCoatch()
                    .pipe(
                        // switchMap((data) => {
                        //     const getmeiD = data.data.id;
                        //     this._userService.user = data;
                        //     this._userService.isAuthorized = true;
                        //     this._cookieService.put('userId', getmeiD);
                        //     return this._getTokenForChat(role)
                        // })

                        map((data) => {
                            const getmeiD = data.data.id;
                            this._userService.user = data;
                            this._userService.isAuthorized = true;
                            this._cookieService.put('userId', getmeiD);
                            this._getTokenForChat(role).subscribe();
                            return true;
                        }),
                        catchError(() => {
                            this._userService.user = null;
                            this._userService.isAuthorized = false;
                            return throwError(true);
                        })
                    )
            }
            default: {
                this._userService.user = null;
                this._userService.isAuthorized = false;
                return true;
            }
        }
    }
    private _getTokenForChat(role: string) {
        if (!this._cookieService.get('chatToken')) {
            let token = this._cookieService.get('access');
            return this._userService.getTokenForChat(this._userService.user.data.user.id, role, token).pipe(
                map((data) => {
                    console.log(data);
                    // this._cookieService.put('chatToken',data)
                    return data
                })
            )
        }
    }
}
