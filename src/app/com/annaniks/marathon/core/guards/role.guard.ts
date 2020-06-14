import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../services/user.service';

import { Observable } from 'rxjs';
import { AuthModal } from '../modals';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _matDialog: MatDialog,
        private _router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const isAuthorized = this._userService.isAuthorized;

        if (!isAuthorized) {
            const dialogRef = this._matDialog.open(AuthModal, {
                width: "100%",
                maxWidth: "100vw",
            });
            dialogRef.afterClosed().subscribe((value) => {
                if (value) {
                    this._router.navigate([state.url]);
                }
            })
        }

        return isAuthorized;
    }
}