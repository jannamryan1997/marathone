import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

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
                "feed": this._baseUrl + `/feed/feeds/${feedId}/`,
                "user": this._baseUrl + `/client/user/${this.userId}/`
            })
        }
        else if (this.role === 'coach') {
            return this._httpClient.post<any>(this._baseUrl + url,
                {
                    "feed": this._baseUrl + `/feed/feeds/${feedId}/`,
                    "coach": this._baseUrl + `/coach/coach/${this.userId}/`
                }
            )
        }
    }

    public diseLikeFeed(isLikedId: number): Observable<any> {
        return this._httpClient.delete(this._baseUrl + `/feed/like/${isLikedId}`);
    }
}