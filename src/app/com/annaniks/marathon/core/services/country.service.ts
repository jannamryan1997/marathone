import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class CountryService {

    constructor(private http:HttpClient) {}

    getCountries() {
        return this.http.get('assets/data/countries.json')
                    // .toPromise()
                    // .then(res => <any[]> res.json().data)
                    // .then(data => { return data; });
    }
}