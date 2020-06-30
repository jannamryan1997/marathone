import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { CountryService } from '../../../core/services/country.service';
import { Country, UploadFileResponse } from '../../../core/models';
import { UserService } from '../../../core/services/user.service';



@Component({
    selector: "app-profile",
    templateUrl: "profile.view.html",
    styleUrls: ["profile.view.scss"]
})
export class ProfileView implements OnInit {
    public role: string;
    public country: any;
    public filteredCountriesSingle: any[];
    public filteredCountriesMultiple: any[];
    public profileFormGroup: FormGroup;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public localImage: string = 'assets/images/img2.png';

    constructor(
        private _fb: FormBuilder,
        private _countryService: CountryService,
        private _cookieService: CookieService,
        private _userService: UserService,
    ) {
        this.role = this._cookieService.get('role');
    }

    ngOnInit() {
        console.log(this._userService);
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

    private _setFormDataForImage(image) {
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);

                this._userService.uploadVideoFile(formData)
                    .subscribe((data: UploadFileResponse) => {
                        console.log(data);
                        this.localImage = 'http://annaniks.com:6262/media/' + data.file_name;

                    })
            }
        }
    }


    public setServicePhoto(event) {
        if (event) {
            this._setFormDataForImage(event);

        }

    }



    public filterCountryMultiple(event) {
        let query = event.query;
        this._countryService.getCountries().subscribe((countries: Country[]) => {
            console.log(countries);

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


    // filterCountrySingle(event) {
    //     let query = event.query;
    //     this._countryService.getCountries().subscribe((data: any) => {
    //         this.filteredCountriesSingle = this.filterCountry(query, data);
    //     })
    // }
