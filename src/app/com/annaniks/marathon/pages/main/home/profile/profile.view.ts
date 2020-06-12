import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../../../../core/services/country.service';
import { Country } from '../../../../core/models';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: "app-profile",
    templateUrl: "profile.view.html",
    styleUrls: ["profile.view.scss"]
})
export class ProfileView implements OnInit {
    public role: string;
    country: any;
    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];


    public profileFormGroup: FormGroup;

    constructor(private _fb: FormBuilder, private _countryService: CountryService, private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
    }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.profileFormGroup = this._fb.group({
            fullName: [null, Validators.required],
            userName: [null, Validators.required],
            location: [null, Validators.required],
            languages: [null],
            staus: ["Contrary to popular belasief, Lorem Ipsum is not simply random text. It has roots in a piece of clasassical Latin literature from 45 BC, making over 2000 years . Richard McCsasalintock, a Latin .fessor at", Validators.required],
            speciality: [null],
            facebook: [null],
            instagram: [null],
            linkedin: [null],
            youtube: [null],
            about: ["Contrary to popular belasief, Lorem Ipsum is not simply random text. It has roots in a piece of clasassical Latin literature from 45 BC, making over 2000 years . Richard McCsasalintock, a Latin .fessor at"]
        })
    }


    // filterCountrySingle(event) {
    //     let query = event.query;
    //     this._countryService.getCountries().subscribe((data: any) => {
    //         this.filteredCountriesSingle = this.filterCountry(query, data);
    //     })
    // }

    filterCountryMultiple(event) {
        let query = event.query;
        this._countryService.getCountries().subscribe((countries: Country[]) => {
            console.log(countries);

            this.filteredCountriesMultiple = this.filterCountry(query, countries);
        });
    }
    filterCountry(query, countries: Country[]): Country[] {

        let filtered: any[] = [];
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }

        }
        return filtered;
    }

}