import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInResponse, SignUpData, SignUpResponse, SignInData } from '../models';

@Injectable()


export class AuthUserService {

    constructor(private _httpCliet: HttpClient) {}

    public SignIn(body: SignInData): Observable<SignInResponse> {
        let params = new HttpParams();
        params.set('authorization', 'false');
        return this._httpCliet.post<SignInResponse>('/client-login/', body, { params });
    }
    public signUpClient(body: SignUpData): Observable<SignUpResponse> {
        let params = new HttpParams();
        params.set('authorization', 'false');
        return this._httpCliet.post<SignUpResponse>('/client/user/', body, { params });
    }

    public signUpCoach(body:SignUpData):Observable<SignUpResponse>{
        let params =new HttpParams();
        params.set('authorization','false');
        return this._httpCliet.post<SignUpResponse>('/coach/coach/', body, { params });
    }

}