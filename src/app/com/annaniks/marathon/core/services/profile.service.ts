import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl) {

    }
    public getProfile(role: string, id: number): Observable<any> {
        let roles = role == 'client' ? '/client/user' : '/coach/coach'

        return this._httpClient.get<any>(this._baseUrl + `${roles}/${id}/`)
    }
    public follow(body): Observable<any> {
        return this._httpClient.post<any>(this._baseUrl + `/feed/follower/`, body)
    }
    public getFeedByProfileId(queryParamsName: string, id: number, isAll: string): Observable<any> {
        return this._httpClient.get(this._baseUrl + `/feed/feeds/?${queryParamsName}=${id}&all=${isAll}`);
    }

    public deleteProfileInformation(profileInformationUrl: string, body): Observable<any> {
        return this._httpClient.delete(profileInformationUrl, body);
    }

}