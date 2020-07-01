import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { CountryService } from '../../../core/services/country.service';
import { Country, UploadFileResponse } from '../../../core/models';
import { UserService } from '../../../core/services/user.service';
import { UserResponseData } from '../../../core/models/user';



@Component({
    selector: "app-profile",
    templateUrl: "profile.view.html",
    styleUrls: ["profile.view.scss"]
})
export class ProfileView implements OnInit {
    public user: UserResponseData;
    public role: string;
    public country: any;
    public filteredCountriesSingle: any[];
    public filteredCountriesMultiple: any[];
    public profileFormGroup: FormGroup;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public localImage: string = "/assets/images/img2.png";
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
        console.log(this._userService.user);
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

                        this._putClient(data.file_name);
                        this.loading = false;
                    })
            }
        }
    }

    private _putClient(file_name): void {
        this._userService.user.data.avatar = file_name;
        if (this.role === 'client') {
            this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getClient().subscribe((data) => {
                        this.localImage = 'http://annaniks.com:6262/media/' + data.data.avatar;
                        console.log(data);

                    });


                }),
                err=>{
                    this.loading=false;
                }
        }
        else {
            this._userService.putCoatch(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getCoatch().subscribe((data) => {
                        this.localImage = 'http://annaniks.com:6262/media/' + data.data.avatar;
                        console.log(data);

                    });


                })
        }
    }



    public setServicePhoto(event) {
        this.loading=true;
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
