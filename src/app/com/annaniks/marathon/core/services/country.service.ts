import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CountryService {

    constructor(@Inject("BASE_URL") private _baseUrl: string, private _httpClient: HttpClient) { }

    getCountries(): Observable<any> {
        return this._httpClient.get<any>(this._baseUrl + '/utils/location-country/');
    }
    getSpeciality(): Observable<any> {
        return this._httpClient.get<any>(this._baseUrl + '/career/speciality/');
    }

}