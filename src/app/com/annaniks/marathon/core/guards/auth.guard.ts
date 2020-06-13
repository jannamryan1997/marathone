import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUserService } from '../services/user.service';
import { map, catchError } from 'rxjs/operators';
import { AuthModal } from '../modals';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _matDialog: MatDialog,
        private _ProfileUserService: ProfileUserService) {

    }

    canActivate(): Promise<boolean> | Observable<boolean> | boolean {
        return this._ProfileUserService.getClient()
            .pipe(
                map((data) => {
                    console.log(data,"dataaaaaaaaaaaaaaa");
                    
                    if (data) {
                        this._ProfileUserService.user = data;
                        console.log(this._ProfileUserService.user);
                        return true;

                    }
                    else {
                        this._matDialog.open(AuthModal, {
                            width: "100%",
                            maxWidth: "100vw",
                        })
                    }
                }),
                catchError((err) => {
                    this._matDialog.open(AuthModal, {
                        width: "100%",
                        maxWidth: "100vw",
                    })
                    return throwError(false);
                })
            )
    }
}
