import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileResponse } from '../models';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user;
    public isAuthorized: boolean = false;

    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl) { }

    public getClient(): Observable<any> {
        return this._httpClient.get<any>('/client/get/me/');
    }

    public getCoatch(): Observable<any> {
        return this._httpClient.get<any>('/coach/get/me');
    }


    public putClient(id: string, body) {
        return this._httpClient.put<any>(`/client/user/${id}/`, body);
    }

    public putCoatch(id: string, body) {
        return this._httpClient.put<any>(`/coach/coach/${id}/`, body);
    }


    public uploadVideoFile(formData: FormData): Observable<UploadFileResponse> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        return this._httpClient.post<UploadFileResponse>('https://uat.marathon.me' + '/upload-file/', formData, { params });
    }

    public postFeed(body: any): Observable<any> {
        return this._httpClient.post<any>(this._baseUrl + '/feed/create', body);
    }
    public getTokenForChat(id: number, role: string, token: string) {
        return this._httpClient.post<any>('https://support.marathon.me/api/remote/forward', {
            id: id,
            type: role,
            token: token
        });
    }
}


// http://192.168.1.115:8000/api