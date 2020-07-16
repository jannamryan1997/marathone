import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { FeedData } from '../../../core/models';


@Injectable()

export class FeedService {
    role: string;
    public userId;
    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl, private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
        this.userId = this._cookieService.get('userId');

    }

    public feed(page: number): Observable<FeedData> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        if (this.role === 'client') {
            return this._httpClient.get<FeedData>(this._baseUrl + '/feed/feeds/' + `?creator_client=${this.userId}&page=${page}`, { params })
        }
        else if (this.role === 'coach') {
            return this._httpClient.get<FeedData>(this._baseUrl + '/feed/feeds/' + `?creator=${this.userId}&page=${page}`, { params })
        }
        else {
            return this._httpClient.get<FeedData>(this._baseUrl + '/feed/feeds/' + `?page=${page}`, { params })
        }

    }

    public deleteFeed(feedId: number): Observable<any> {
        if (this.role === 'client') {
            return this._httpClient.delete<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
        else if (this.role === 'coach') {
            return this._httpClient.delete<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
    }

    public getFeedById(feedId: number): Observable<any> {
        if (this.role === 'client') {
            return this._httpClient.get<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
        else if (this.role === 'coach') {
            return this._httpClient.get<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
    }

}


/////feeed creator
