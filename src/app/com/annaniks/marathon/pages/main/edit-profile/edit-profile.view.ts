import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { UserResponseData, Results } from '../../../core/models/user';
import { CountryService } from '../../../core/services/country.service';
import { UserService } from '../../../core/services/user.service';
import { UploadFileResponse } from '../../../core/models';
import { CertificateData } from '../../../core/models/certificates';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: "app-edit-profile",
    templateUrl: "edit-profile.view.html",
    styleUrls: ["edit-profile.view.scss"]
})
export class EditProfileView implements OnInit {
    public user: UserResponseData;
    public role: string;
    public country: any;
    public filteredCountriesMultiple: any[];
    public filteredSpecialitesMultiple: any[];
    public profileFormGroup: FormGroup;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public localImage: string = "/assets/images/user-icon-image.png";
    public headerLocalImage: string = '/assets/images/user-icon-image.png'
    public loading: boolean = false;
    public router: boolean = false;
    public education = new FormArray([]);
    public experience = new FormArray([]);
    public certificates: CertificateData[] = [];
    public certificatesImage: string;
    public languages = [];
    public speciality = [];
    public url = [];
    public spacialityUrl = [];
    public countries = [];

    public leng = [];

    constructor(
        private _fb: FormBuilder,
        private _countryService: CountryService,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _router: Router,
        private _location: Location,
        @Inject("FILE_URL") private _fileUrl: string,
    ) {
        this.role = this._cookieService.get('role');
        this.user = this._userService.user;

        if (this._userService.user.data.avatar) {
            this.localImage = this._fileUrl + this._userService.user.data.avatar;
        }
        if (this._userService.user.data.cover) {
            this.headerLocalImage = this._fileUrl + this._userService.user.data.cover;
        }
        console.log(this.user);

    }

    ngOnInit() {
        this._formBuilder();
        this._setPatchValue();
        this._getCountries();
        this._getSpeciality();
        if (this.user.data.certificates) {
            const certificates = this.user.data.certificates;
            certificates.forEach(element => {
                this.certificates.push({ description: element.description, file: element.file })
            });
        }

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
            userName: this.user.data.user.email,
            status: this.user.data.status,
            about: this.user.data.about,
            facebook: this.user.data.facebook,
            youtube: this.user.data.youtube,
            instagram: this.user.data.instagram,
            linkedin: this.user.data.linkedin,
            location: this.user.data.location,
        });

        const education = this.user.data.education;
        const experience = this.user.data.experience;

        education.forEach(element => {
            this.education.push(new FormControl({
                name: element.name,
                specialization: element.specialization,
                start_date: Number(element.start_date),
                end_date: Number(element.end_date),
            }));
        });
        experience.forEach(element => {
            this.experience.push(new FormControl({
                name: element.name,
                specialization: element.specialization,
                start_date: Number(element.start_date),
                end_date: Number(element.end_date),
            }));
        });
    }

    /////--------------------PCTURE ULPOAD
    private _setFormDataForImage(image, type: string): void {
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);

                this._userService.uploadVideoFile(formData)
                    .subscribe((data: UploadFileResponse) => {
                        this._putClient(data.file_name, type);
                        this.loading = false;
                    })
            }
        }
    }

    private _setFormDataCertifivatesImage(image): void {
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);

                this._userService.uploadVideoFile(formData)
                    .subscribe((data: UploadFileResponse) => {
                        this.certificatesImage = data.file_name;
                    })
            }
        }
    }

    // private _putClient(file_name): void {
    //     this._userService.user.data.avatar = file_name;
    //     if (this.role === 'client') {
    //         this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
    //             .subscribe((data) => {
    //                 this._userService.getClient().subscribe((data) => {
    //                     this.localImage = this._fileUrl + data.data.avatar;

    //                 });
    //             }),
    //             err => {
    //                 this.loading = false;
    //             }
    //     }
    //     else {
    //         this._userService.putCoatch(this._userService.user.data.id, this._userService.user.data)
    //             .subscribe((data) => {
    //                 this._userService.getCoatch().subscribe((data) => {
    //                     this.localImage = this._fileUrl + data.data.avatar;

    //                 });


    //             })
    //     }
    // }
    private _putClient(file_name, type): void {
        if (type === 'avatar') {
            this._userService.user.data.avatar = file_name;
        } else {
            this._userService.user.data.cover = file_name;
        }
        if (this.role === 'client') {
            this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getClient().subscribe((data) => {
                        if (type === 'avatar') {
                            this.localImage = this._fileUrl + data.data.avatar;
                        }
                        else {
                            this.headerLocalImage = this._fileUrl + data.data.cover;
                        }


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
                        if (type === 'avatar') {
                            this.localImage = this._fileUrl + data.data.avatar;
                        }
                        else {
                            this.headerLocalImage = this._fileUrl + data.data.cover;
                        }

                    });


                })
        }
    }

    public setServicePhoto(event) {
        this.loading = true;
        if (event) {
            this._setFormDataForImage(event, 'avatar');

        }

    }

    public setServiceHeaderPhoto(event) {
        if (event) {
            this._setFormDataForImage(event, 'headerImage');

        }
    }

    ///--------------PICTURE UPLOAD


    ////////--------------- UPDATE USERRR AND COATCH
    private _updateCoatch(): void {
        const role = this._cookieService.get('role') || '';
        const languages = this.profileFormGroup.get('languages').value || [];
        const speciality = this.profileFormGroup.get('speciality').value || [];
        for (let item of languages) {
            this.url.push(item.url);
        }
        for (let item of speciality) {
            this.spacialityUrl.push(item.url);
        }
        this.user.data.user.last_name = this.profileFormGroup.value.userName,
            this.user.data.user.first_name = this.profileFormGroup.value.firstName,
            this.user.data.status = this.profileFormGroup.value.status,
            this.user.data.about = this.profileFormGroup.value.about,
            this.user.data.facebook = this.profileFormGroup.value.facebook,
            this.user.data.instagram = this.profileFormGroup.value.instagram,
            this.user.data.youtube = this.profileFormGroup.value.youtube,
            this.user.data.linkedin = this.profileFormGroup.value.linkedin,
            this.user.data.location = this.profileFormGroup.value.location,
            this.user.data.education = this.education.value,
            this.user.data.experience = this.experience.value,
            this.user.data.certificates = this.certificates,
            this.user.data.language = this.url,
            this.user.data.speciality = this.spacialityUrl;
        this._userService.putCoatch(this._userService.user.data.id, this.user.data)
            .subscribe((data) => {
                this._userService.getCoatch().subscribe((data) => {
                    // this._router.navigate([`/profile/${role}`]);
                })
            })

    }

    private _updateClient(): void {
        const role = this._cookieService.get('role') || '';
        const languages = this.profileFormGroup.get('languages').value || [];
        const speciality = this.profileFormGroup.get('speciality').value || [];
        for (let item of languages) {
            this.url.push(item.url);
        }
        for (let item of speciality) {
            this.spacialityUrl.push(item.url);
        }
        this.user.data.user.last_name = this.profileFormGroup.value.userName,
            this.user.data.user.first_name = this.profileFormGroup.value.firstName,
            this.user.data.status = this.profileFormGroup.value.status,
            this.user.data.facebook = this.profileFormGroup.value.facebook,
            this.user.data.instagram = this.profileFormGroup.value.instagram,
            this.user.data.youtube = this.profileFormGroup.value.youtube,
            this.user.data.linkedin = this.profileFormGroup.value.linkedin,
            this.user.data.location = this.profileFormGroup.value.location,
            this.user.data.language = this.url,
            this.user.data.speciality = this.spacialityUrl;
        this._userService.putClient(this._userService.user.data.id, this.user.data)
            .subscribe((data) => {
                this._userService.getClient().subscribe((data) => {
                    // this._router.navigate([`/profile/${role}`])
                })
            })
    }

    /////----------------------UPDATE USER AND COATC


    public update(): void {
        if (this.role === 'coach') {
            this._updateCoatch();
            this._location.back();
        }
        else if (this.role === 'client') {
            this._updateClient();
            this._location.back();
        }
    }

    public addEducatin(): void {
        this.education.push(new FormControl(''));
    }

    public removeEducationItem(event, ind): void {
        if (event) {
            this.education.controls.splice(ind, 1)
        }

    }
    public addExperience(): void {
        this.experience.push(new FormControl(''));
    }

    public removeExperianceItem(event, ind): void {
        if (event) {
            this.experience.controls.splice(ind, 1);
        }
    }


    public setCeriticatesPhoto(event): void {
        if (event) {
            this._setFormDataCertifivatesImage(event);
        }
    }

    public addCertificates(): void {
        this.certificates.push({ file: this.certificatesImage, description: this.profileFormGroup.value.certificatesLocation });
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




    private _getCountries(): void {
        this._countryService.getLanguages().subscribe((countries) => {
            this.countries = countries.results;
            const selectedlanguages: any[] = this.user.data.language || [];
            const selectedcountries = [];
            selectedlanguages.map((e) => {
                const findedCountry = this.countries.find((f) => f.url === e);
                if (findedCountry) {
                    selectedcountries.push(findedCountry);
                }
            })
            this.profileFormGroup.patchValue({
                languages: selectedcountries
            })


        });
    }

    public filterCountry(query: string, countries: Results[]): Results[] {
        let filtered: any[] = [];
        for (let item of countries) {
            if (item.name.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(item);
            }
        }
        return filtered;
    }

    public filterCountryMultiple(event): void {
        let query = event.query;
        this.filteredCountriesMultiple = this.filterCountry(query, this.countries);
    }



    private _getSpeciality(): void {
        this._countryService.getSpeciality().subscribe((speciality) => {
            this.speciality = speciality.results;
            const selectedspaciality: any[] = this.user.data.speciality || [];
            const selectspaciality = [];
            selectedspaciality.map((e) => {
                const findedCountry = this.speciality.find((f) => f.url === e);
                if (findedCountry) {
                    selectspaciality.push(findedCountry);
                }
            })
            this.profileFormGroup.patchValue({
                speciality: selectspaciality
            })


        });
    }



    public filterSpecialitypMultiple(event) {
        let query = event.query;
        this.filteredSpecialitesMultiple = this.filterCountry(query, this.speciality);
    }


    public filterSpeciality(query, special) {
        let filtered: any[] = [];
        for (let item of special) {
            if (item.name.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(item);
            }
        }
        return filtered;
    }






}











