import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { FeedData, FeedResponseData } from '../../../core/models';


@Injectable()

export class FeedService {
    role: string;
    public userId;
    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl, private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
        this.userId = this._cookieService.get('userId');
    }

    public feed(page: number): Observable<FeedData> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + this._cookieService.get('access'));
        if (this.role === 'client') {
            return this._httpClient.get<FeedData>(this._baseUrl + '/feed/feeds/' + `?creator_client=${this.userId}&page=${page}`, { headers: headers })
        }
        else if (this.role === 'coach') {
            return this._httpClient.get<FeedData>(this._baseUrl + '/feed/feeds/' + `?creator=${this.userId}&page=${page}`, { headers: headers })
        }
        else {
            return this._httpClient.get<FeedData>(this._baseUrl + '/feed/feeds/' + `?page=${page}`)
        }

    }

    public deleteFeed(feedId: number): Observable<any> {
        if (this.role === 'client') {
            return this._httpClient.delete<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
        if (this.role === 'coach') {
            return this._httpClient.delete<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
    }

    public getFeedById(feedId: number): Observable<FeedResponseData> {
        // return this._httpClient.get<FeedResponseData>(this._baseUrl + `/feed/feeds/${feedId}/`);

        if (this.role) {
            let headers = new HttpHeaders();
            headers = headers.append('Authorization', 'Bearer ' + this._cookieService.get('access'));
            return this._httpClient.get<any>(this._baseUrl + `/feed/feeds/${feedId}/`, { headers: headers });
        } else {
            return this._httpClient.get<any>(this._baseUrl + `/feed/feeds/${feedId}/`)
        }
        // if (this.role === 'coach') {
        //     return this._httpClient.get<any>(this._baseUrl + `/feed/feeds/${feedId}/`, { headers: headers });
        // }
    }

    public updateFeedById(feedMediaUrl:string, body:any): Observable<any> {
        return this._httpClient.put(feedMediaUrl, body);
    }


}

