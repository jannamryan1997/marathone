import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { CountryService } from '../../../../core/services/country.service';
import { Country, UploadFileResponse } from '../../../../core/models';
import { UserService } from '../../../../core/services/user.service';
import { UserResponseData } from '../../../../core/models/user';



@Component({
    selector: "app-edit-profile",
    templateUrl: "edit-profile.view.html",
    styleUrls: ["edit-profile.view.scss"]
})
export class EditProfileView implements OnInit {
    public user: UserResponseData;
    public role: string;
    public country: any;
    public filteredCountriesSingle: any[];
    public filteredCountriesMultiple: any[];
    public profileFormGroup: FormGroup;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public localImage: string = "/assets/images/user-icon-image.png";
    public loading: boolean = false;

    constructor(
        private _fb: FormBuilder,
        private _countryService: CountryService,
        private _cookieService: CookieService,
        private _userService: UserService,
    ) {
        this.role = this._cookieService.get('role');
        this.user = this._userService.user;
     
        if (this._userService.user.data.avatar) {
            // this.localImage = 'http://192.168.1.115:9000/media/' + this._userService.user.data.avatar;
               this.localImage = 'http://annaniks.com:6262/media/' +this._userService.user.data.avatar;
        }

    }

    ngOnInit() {
        this._formBuilder();
        this._setPatchValue();
    }

    private _formBuilder(): void {
        this.profileFormGroup = this._fb.group({
            fullName: [null, Validators.required],
            userName: [null, Validators.required],
            location: [null, Validators.required],
            languages: [null],
            staus: [null, Validators.required],
            speciality: [null],
            facebook: [null],
            instagram: [null],
            linkedin: [null],
            youtube: [null],
            about: [null]
        })
    }

    private _setPatchValue(): void {
        this.profileFormGroup.patchValue({
            fullName: this.user.data.user.last_name,
            userName: this.user.data.user.email,
        })
    }




    public filterCountryMultiple(event) {
        let query = event.query;
        this._countryService.getCountries().subscribe((countries: Country[]) => {

            this.filteredCountriesMultiple = this.filterCountry(query, countries);
        });
    }
    public filterCountry(query, countries: Country[]): Country[] {

        let filtered: any[] = [];
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }

        }
        return filtered;
    }


    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }

}

