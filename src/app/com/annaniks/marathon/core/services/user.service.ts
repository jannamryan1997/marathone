import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileResponse } from '../models';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user;
    public isAuthorized: boolean = false;

    constructor(private _httpClient: HttpClient, private _cookieService: CookieService) {

    }

    public getClient(): Observable<any> {
        return this._httpClient.get<any>('/client/get/me/');
    }

    public getCoatch(): Observable<any> {
        return this._httpClient.get<any>('/coach/get/me');
    }


    public uploadVideoFile(formData: FormData): Observable<UploadFileResponse> {
        let params = new HttpParams();
        params= params.set('authorization', 'false');
        return this._httpClient.post<UploadFileResponse>('http://annaniks.com:6262' + '/upload-file/', formData,{params})
    }

    public postFeed(body: any): Observable<any> {
         return this._httpClient.post<any>('http://annaniks.com:6262/api/feed/create', body);
        // return this._httpClient.post<any>('http://192.168.1.115:9000/api/feed/create', body);
    }
}


// http://annaniks.com:6262


