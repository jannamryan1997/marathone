import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInResponse, SignUpData, SignUpResponse, SignInData } from '../../../core/models';
import { ForgotPasswordData } from '../../../core/models/forgot-password';

@Injectable()


export class AuthUserService {

    constructor(private _httpCliet: HttpClient) { }

    public SignIn(body: SignInData): Observable<SignInResponse> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        return this._httpCliet.post<SignInResponse>('/client-login/', body, { params });
    }
    public signUpClient(body: SignUpData): Observable<SignUpResponse> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        return this._httpCliet.post<SignUpResponse>('/client/user/', body, { params });
    }

    public signUpCoach(body: SignUpData): Observable<SignUpResponse> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        return this._httpCliet.post<SignUpResponse>('/coach/coach/', body, { params });
    }

    public forgotPassword(body): Observable<any> {
        return this._httpCliet.post<any>('/password/reset/confirm/', body);

    }

    public sendEmail(body): Observable<any> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        return this._httpCliet.post('/password/reset/', body, { params });
    }

}