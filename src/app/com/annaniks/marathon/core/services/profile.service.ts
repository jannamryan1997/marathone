import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl) { }

    public getProfile(role: string, slug: string): Observable<any> {
        let roles = role == 'client' ? '/client/user/' : '/coach/coach/';
        return this._httpClient.get<any>(this._baseUrl + `${roles}?slug=${slug}`)
    }
    public getfollowProfileById(role: string, id: number): Observable<any> {
        let roles = role == 'client' ? '/client/user/' : '/coach/coach/';
        return this._httpClient.get<any>(this._baseUrl + `${roles}${id}/`)
    }

    public follow(role: string, myUrl: string, userRole: string, userUrl: string): Observable<any> {
        let sendBody = {}
        if (role == 'client') {
            sendBody['who_user'] = myUrl
        } else {
            sendBody['who_coach'] = myUrl
        }
        if (userRole == 'client') {
            sendBody['whom_user'] = userUrl
        } else {
            sendBody['whom_coach'] = userUrl

        }
        return this._httpClient.post<any>(this._baseUrl + `/feed/follower/`, sendBody)
    }
    public unfollow(id: number): Observable<any> {
        return this._httpClient.delete<any>(this._baseUrl + `/feed/follower/${id}/`)
    }
    public getFeedByProfileId(queryParamsName: string, id: number, isAll: string): Observable<any> {
        return this._httpClient.get(this._baseUrl + `/feed/feeds/?${queryParamsName}=${id}&me=${isAll}`);
    }

    public deleteProfileInformation(profileInformationUrl: string, body): Observable<any> {
        return this._httpClient.delete(profileInformationUrl, body);
    }
    public getFamiliarList(userId:number){
        return this._httpClient.get(`/user/familiar/${userId}`)
    }
}