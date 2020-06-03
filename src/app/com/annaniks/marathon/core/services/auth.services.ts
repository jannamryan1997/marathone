import { Injectable, Inject } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInResponse, SignUpData } from '../models';

@Injectable()


export class AuthService {
    public access: string;
    public refresh: string;


    constructor(private _cookieService: CookieService, private _httpCliet: HttpClient,
        @Inject("BASE_URL") private _baseUrl: string,
        
    ) {}

    public SignIn(body: any): Observable<any> {
        let params = new HttpParams();
        params.set('authorization', 'false');
        return this._httpCliet.post<any>('/client-login/', body, { params });
    }
    public signUp(body: SignUpData): Observable<SignInResponse> {
        let params = new HttpParams();
        params.set('authorization', 'false');
        return this._httpCliet.post<SignInResponse>('/client/user/', body, { params });
    }

}