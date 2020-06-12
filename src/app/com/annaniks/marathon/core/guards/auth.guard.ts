import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()

export class AuthGuard implements CanActivate {
    public role: string;
    constructor(private _cookieService: CookieService, private _router: Router, private _matDialog: MatDialog) {
        this.role = this._cookieService.get('role')
    }

    canActivate(): Promise<boolean> | Observable<boolean> | boolean {
        // if (this._cookieService.get('access') && this._cookieService.get('refresh') 
        // || this._cookieService.get('fbUser') || this._cookieService.get('googleUser')) {
        //     return true;
        // }
        // else {
        //     this._router.navigate(['/feed']);
        //     return false;
        // }
        if (this.role === 'client') {
            this._router.navigate(['/home/client']);
            return true;
        }
        if (this.role === 'coach') {
            this._router.navigate(['/home/coach']);
            return true;
        }
        else {
            this._router.navigate(['/feed']);
            return false;
        }


    }
}