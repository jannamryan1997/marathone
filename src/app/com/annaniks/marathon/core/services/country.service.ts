import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CountryService {

    constructor(@Inject("BASE_URL") private _baseUrl: string, private _httpClient: HttpClient) { }

    getLanguages(): Observable<any> {
        return this._httpClient.get<any>(this._baseUrl + '/utils/language/');
    }
    getSpeciality(): Observable<any> {
        return this._httpClient.get<any>(this._baseUrl + '/career/speciality/?page_size=1000');
    }

    getCountry(): Observable<any> {
        return this._httpClient.get('assets/data/country.json');
    }
    getAllLanguages(): Observable<any> {
        return this._httpClient.get('assets/data/languages.json');
    }
}