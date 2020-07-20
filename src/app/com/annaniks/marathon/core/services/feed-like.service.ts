import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class FeedLikeService {

    role: string;
    public userId;
    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl, private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
        this.userId = this._cookieService.get('userId');

    }

    public likeFeed(feedId: number) {
        let url = '/feed/like/';
        if (this.role === 'client') {
            return this._httpClient.post<any>(this._baseUrl + url, {
                "feed": `http://annaniks.com:6262/api/feed/feeds/${feedId}/`,
                "user": `http://annaniks.com:6262/api/client/user/${this.userId}/`
            })
        }
        else if (this.role === 'coach') {
            return this._httpClient.post<any>(this._baseUrl + url,
                {
                    "feed": `http://annaniks.com:6262/api/feed/feeds/${feedId}/`,
                    "coach": `http://annaniks.com:6262/api/coach/coach/${this.userId}/`
                }
            )
        }


    }
}