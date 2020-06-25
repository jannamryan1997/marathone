import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()

export class FeedService {

    constructor(private _httpClient: HttpClient, @Inject('BASE_URL') private _baseUrl) { }

    public feed(): Observable<any> {
    
        return this._httpClient.get<any>( this._baseUrl+'/feed/feeds/'+'?creator_client=6')
    }

    
}

/////feeed creator