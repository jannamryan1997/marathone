import {Injectable, Inject} from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LikeResponseData } from '../models/like';

@Injectable()

export class LikeService {

    constructor(private _httpClient:HttpClient,@Inject('BASE_URL') private _baseUrl){}

    public getLike(feedId:string):Observable<LikeResponseData>{
        let params=new HttpParams();
       params= params.append('feed',feedId)
        return this._httpClient.get<LikeResponseData>(this._baseUrl+'/feed/like/',{params:params});
    }
}