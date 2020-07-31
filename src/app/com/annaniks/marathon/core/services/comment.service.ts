import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    private _role: string;
    public userId;
    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl, private _cookieService: CookieService) {
        this._role = this._cookieService.get('role');
        this.userId = this._cookieService.get('userId');
    }

    public createFeedComment(feedId: number, message: string, parent?: string) {
        let body = {
            "feed": this._baseUrl+`/feed/feeds/${feedId}/`,
            "message": message
        }
        if (this._role === 'client') {
            body['user'] = this._baseUrl+`/client/user/${this.userId}/`
        }

        else if (this._role === 'coach') {
            body['coach'] = this._baseUrl+`/coach/coach/${this.userId}/`
        }

        if (parent) {
            body['parent'] = parent
        }
        return this._httpClient.post(this._baseUrl + '/feed/comment/', body)
    }

    public getFeedCommentById(feedId: number) {
        let params = new HttpParams();
        params = params.set('authorization', 'true');
        return this._httpClient.get<any>(this._baseUrl + `/feed/comment/?feed=${feedId}`, { params: params })
    }
    public getCommentLikeOrDislikeBody(commentUrl: string) {
        let body = {
            "comment": commentUrl
        }
        if (this._role === 'client') {
            body['user'] = this._baseUrl+`/client/user/${this.userId}/`
        }

        else if (this._role === 'coach') {
            body['coach'] = this._baseUrl+`/coach/coach/${this.userId}/`
        }
        return body
    }
    public likeComment(commentUrl: string) {
        let params = new HttpParams();
        params = params.set('authorization', 'true');
        let body = this.getCommentLikeOrDislikeBody(commentUrl);
        return this._httpClient.post(this._baseUrl + '/feed/like-comment/', body, { params })
    }

    public dislikeComment(commentUrl: string) {
        let params = new HttpParams();
        params = params.set('authorization', 'true');
        let body = this.getCommentLikeOrDislikeBody(commentUrl);
        return this._httpClient.post(this._baseUrl + '/feed/dislike-comment/', body, { params })
    }
}