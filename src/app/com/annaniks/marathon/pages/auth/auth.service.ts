import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInResponse, LoginResponse } from '../../core/models';

@Injectable()

export class AuthService {

    constructor(private _httpCliet: HttpClient) { }

    public SignIn(body: SignInResponse): Observable<any> {
        let params = new HttpParams();
        params.set('authorization', 'false');
        return this._httpCliet.post<any>('', body, { params });
    }
    public login(body: LoginResponse): Observable<any> {
        return this._httpCliet.post<any>('', body);
    }
}