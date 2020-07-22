import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { UserResponseData } from '../../../core/models/user';
import { CountryService } from '../../../core/services/country.service';
import { UserService } from '../../../core/services/user.service';
import { Country, UploadFileResponse } from '../../../core/models';
import { CertificateData } from '../../../core/models/certificates';
import { Router } from '@angular/router';

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
    public loading: boolean = false;
    public router: boolean = false;
    public education = new FormArray([]);
    public experience = new FormArray([]);
    public certificates: CertificateData[] = [];
    public certificatesImage: string;
    public languages = [];
    public speciality = [];

    constructor(
        private _fb: FormBuilder,
        private _countryService: CountryService,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _router: Router,
        @Inject("FILE_URL") private _fileUrl: string,
    ) {
        this.role = this._cookieService.get('role');
        this.user = this._userService.user;

        if (this._userService.user.data.avatar) {
            this.localImage = this._fileUrl + this._userService.user.data.avatar;
        }

    }

    ngOnInit() {
        this._formBuilder();
        this._setPatchValue();
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
            userName: this.user.data.user.last_name,
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
    private _setFormDataForImage(image): void {
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

    private _putClient(file_name): void {
        this._userService.user.data.avatar = file_name;
        if (this.role === 'client') {
            this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
                .subscribe((data) => {
                    this._userService.getClient().subscribe((data) => {
                        this.localImage = this._fileUrl + data.data.avatar;

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
                        this.localImage = this._fileUrl + data.data.avatar;

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
        const role = this._cookieService.get('role') || '';
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
            this.user.data.language = this.languages;
        this._userService.putCoatch(this._userService.user.data.id, this.user.data)
            .subscribe((data) => {
                this._userService.getCoatch().subscribe((data) => {
                    // this._router.navigate([`/profile/${role}`]);
                })
            })

    }

    private _updateClient(): void {
        const role = this._cookieService.get('role') || '';
        this.user.data.user.last_name = this.profileFormGroup.value.userName,
            this.user.data.user.first_name = this.profileFormGroup.value.firstName,
            this.user.data.status = this.profileFormGroup.value.status,
            this.user.data.facebook = this.profileFormGroup.value.facebook,
            this.user.data.instagram = this.profileFormGroup.value.instagram,
            this.user.data.youtube = this.profileFormGroup.value.youtube,
            this.user.data.linkedin = this.profileFormGroup.value.linkedin,
            this.user.data.location = this.profileFormGroup.value.location,
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
        }
        else if (this.role === 'client') {
            this._updateClient();
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


    public filterCountryMultiple(event) {
        console.log(this.profileFormGroup.value.languages);
        let query = event.query;
        this._countryService.getLanguages().subscribe((countries: Country[]) => {
            let contry = [];
            let name: string;
            contry.push(countries)
            for (let item of contry) {
                for (let i of item.results) {
                    if (i.name === this.profileFormGroup.value.languages) {

                    }
                }
            }

            this.filteredCountriesMultiple = this.filterCountry(query, contry);
        });



    }

    public filterCountry(query, countries: Country[]): Country[] {
        let filtered: any[] = [];

        for (let item of countries) {
            for (let language of item.results) {
                this.languages.push(language.url)
                if (language.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(language)
                }
            }
        }
        return filtered;
    }


    public filterSpecialitypMultiple(event) {
        let query = event.query;
        this._countryService.getSpeciality().subscribe((speciality) => {
            let special = [];
            special.push(speciality)


            this.filteredSpecialitesMultiple = this.filterSpeciality(query, special);

        });
    }


    public filterSpeciality(query, special) {
        let filtered: any[] = [];
        for (let item of special) {
            for (let name of item.results) {
                this.speciality.push(name.url)
                if (name.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(name);


                }
            }
        }
        return filtered;
    }



    public changeProfile(event): void {
        if (event && this.role === 'coach') {
            this._updateCoatch();
        }
        else if( event && this.role==='client'){
            this._updateClient();
        }

    }




}











