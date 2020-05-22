import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class IngridientService {

    constructor(private _httpClient: HttpClient) { }

    public getIngridient(): Observable<any> {
        return this._httpClient.get('');
    }
}