import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UploadFileResponse } from '../models';
import { CookieService } from 'ngx-cookie';
@Injectable({
    providedIn: 'root'
})
export class UserService {


    public user;
    public isAuthorized: boolean = false;

    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl,
        private _cookieService: CookieService) { }

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
    public getTokenForChat(id: number, role, token: string) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // var raw = JSON.stringify({ "type": 1, "id": 91, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjYsImp0aSI6Ijc3YzQyNTA3ZGQyOTQxNjk5YmE3NmJmOTVlNzQxNjg4IiwiZXhwIjoxNjU3MTM3MjA4LCJ0b2tlbl90eXBlIjoiYWNjZXNzIn0.bZfJTOgxyoRcIsHPju5w3WcYC8Wh2j5XkTCbX7cU0-k" });
        var raw = JSON.stringify({ "type": role, "id": id, "token": token });

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://support.marathon.me/api/client/forward", requestOptions)
            .then(response => response.text())
            .then((result: any) => {
                console.log(result);
                if (result) {
                    let data = JSON.parse(result);
                    if (data && data.token) {
                        console.log(data);
                        
                        this._cookieService.put('chatToken', data.token);
                        this._cookieService.put('chatId',data.id)
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
}


// http://192.168.1.115:8000/api