import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { UserResponseData } from '../../../core/models/user';
import { CountryService } from '../../../core/services/country.service';
import { UserService } from '../../../core/services/user.service';
import { Country, UploadFileResponse } from '../../../core/models';
import { element } from 'protractor';



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
    public router: boolean = false;
    public education = [{}];
    public experience = [{}];
    public certificates = [
        { image: "", title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aliquid quod tenetur hic abreprehenderit ad, odio eos fugiat animi aspernatur voluptates unde cumque, autem eligendi iure et accusamus" }
    ];

    // public postItem = [
    //     {
    //         postType: "image",
    //         image: "assets/images/foodimg.png"
    //     },

    //     {
    //         postType: "combinations",
    //         image: "assets/images/img3.png",
    //     }
    // ]


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
            this.localImage = 'http://annaniks.com:6262/media/' + this._userService.user.data.avatar;
        }

    }

    ngOnInit() {
        this._formBuilder();
        this._setPatchValue();

    }

    private _formBuilder(): void {
        this.profileFormGroup = this._fb.group({
            firstName: [null, Validators.required],
            userName: [null, Validators.required],
            location: [null, Validators.required],
            languages: [null],
            status: [null, Validators.required],
            speciality: [null],
            facebook: [null],
            instagram: [null],
            linkedin: [null],
            youtube: [null],
            about: [null],
            certificatesLocation: [null]
        })
    }

    private _setPatchValue(): void {
        this.profileFormGroup.patchValue({
            firstName: this.user.data.user.first_name,
            userName: this.user.data.user.last_name,
            status: this.user.data.status,
            about: this.user.data.about,
            languages: this.user.data.ui_language,
        })
    }

    /////--------------------PCTURE ULPOAD
    private _setFormDataForImage(image) {
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);

                this._userService.uploadVideoFile(formData)
                    .subscribe((data: UploadFileResponse) => {
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

                    });
                }),
                err => {
                    this.loading = false;
                }
        }
        else {
            this._userService.putCoatch(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getCoatch().subscribe((data) => {
                        this.localImage = 'http://annaniks.com:6262/media/' + data.data.avatar;

                    });


                })
        }
    }

    public setServicePhoto(event) {
        this.loading = true;
        if (event) {
            this._setFormDataForImage(event);

        }

    }

    ///--------------PICTURE UPLOAD


    ////////--------------- UPDATE USERRR AND COATCH
    private _updateCoatch(): void {
        this.user.data.user.last_name = this.profileFormGroup.value.userName,
            this.user.data.user.first_name = this.profileFormGroup.value.firstName,
            this.user.data.status = this.profileFormGroup.value.status,
            this.user.data.about = this.profileFormGroup.value.about,
            this.user.data.ui_language = [3],
            this._userService.putCoatch(this._userService.user.data.id, this.user.data)
                .subscribe((data) => {
                    this._userService.getCoatch().subscribe((data) => {
                        console.log(data, "getCoartch");
                    })
                })

    }

    private _updateClient(): void {
        this.user.data.user.last_name = this.profileFormGroup.value.userName,
            this.user.data.user.first_name = this.profileFormGroup.value.firstName,
            // this.user.data.status = this.profileFormGroup.value.status,
            this._userService.putClient(this._userService.user.data.id, this.user.data)
                .subscribe((data) => {
                    this._userService.getClient().subscribe((data) => {
                        console.log(data, "client");
                    })
                })
    }

    /////----------------------UPDATE USER AND COATC


    public update(): void {
        if (this.role === 'coach') {
            this._updateCoatch();
        }
        else if (this.role === 'client') {
            this._updateClient();
        }
    }

    public AddEducatin(): void {
        this.education.push({});
    }

    public removeEducationItem(event, ind): void {
        if (event) {
            this.education.splice(ind, 1)
        }

    }
    public AddExperience(): void {
        this.experience.push({});
    }

    public removeExperianceItem(event, ind): void {
        if (event) {
            this.experience.splice(ind, 1);
        }
    }


    public setCeriticatesPhoto(event): void {
        console.log(event);


    }
    public addCertificates(): void {
        this.certificates.push({ image: "", title: this.profileFormGroup.value.certificatesLocation });
    }

    public removeCerticatesItem(event, ind): void {
        if (event) {
            this.certificates.splice(ind, 1);
        }
    }

    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }


    public filterCountryMultiple(event) {
        let query = event.query;
        this._countryService.getCountries().subscribe((countries: Country[]) => {
            console.log(this.profileFormGroup.value.languages, "languages");

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


}














