import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class CombinationService {
    constructor(private _httpClient: HttpClient) { }

    public getCombination(): Observable<any> {
        return this._httpClient.get('');
    }
}