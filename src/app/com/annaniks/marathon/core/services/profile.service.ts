import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl) {

    }
    public getProfile(role: string, id: number) {
        let roles = role == 'client' ? '/client/user' : '/coach/coach'

        return this._httpClient.get<any>(this._baseUrl + `${roles}/${id}/`)
    }
    public follow(body) {
       

        return this._httpClient.post<any>(this._baseUrl + `/feed/follower/`, body)
    }
}