import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class ArticleService {
    role: string;
    public userId;
    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl, private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
        this.userId = this._cookieService.get('userId');
    }

    public getArticleById(feedId: number): Observable<any> {
        return this._httpClient.get<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
    }
    public deleteArticle(feedId: number): Observable<any> {
        if (this.role === 'client') {
            return this._httpClient.delete<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
        else if (this.role === 'coach') {
            return this._httpClient.delete<any>(this._baseUrl + `/feed/feeds/${feedId}/`);
        }
    }
    public updateArticle(feedId: number, body): Observable<any> {
        return this._httpClient.put<any>(this._baseUrl + `/feed/feeds/${feedId}/`, body);
    }
}