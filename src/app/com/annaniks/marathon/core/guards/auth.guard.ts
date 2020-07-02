import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _cookieService: CookieService
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
                            this._cookieService.put('userId', getmeiD)
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
                        map((data) => {
                            const getmeiD = data.data.id;
                            
                            this._userService.user = data;
                            this._userService.isAuthorized = true;
                            this._cookieService.put('userId', getmeiD)
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
}
