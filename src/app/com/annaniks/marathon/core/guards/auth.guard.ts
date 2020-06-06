import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private _cookieService: CookieService, private _router: Router) { }

    canActivate(): Promise<boolean> | Observable<boolean> | boolean {
        if (this._cookieService.get('access') && this._cookieService.get('refresh') 
        || this._cookieService.get('fbUser') || this._cookieService.get('googleUser')) {
            return true;
        }
        else {
            this._router.navigate(['/feed']);
            return false;
        }

    }
}