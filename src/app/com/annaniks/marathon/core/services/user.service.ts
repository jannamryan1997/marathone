import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileUserService {
    public user;
    public isAuthorized: boolean = false;

    constructor(private _httpClient: HttpClient) { }
    
   public  getClient(): Observable<any> {
return this._httpClient.get<any>('/client/get/me/');
    }

public getCoatch():Observable<any>{
    return this._httpClient.get<any>('/coach/get/me');
}

}
