import {Injectable, Inject} from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class FeedService{

    constructor(private _httpClient:HttpClient, @Inject('BASE_URL') private _baseUrl){}

    public feed():Observable<any>{
        // let params = new HttpParams();
        // params.set('authorization', 'true');
        return this._httpClient.get<any>(this._baseUrl+'/feed/feed/')
    }
}