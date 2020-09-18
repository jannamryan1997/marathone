import { Component, OnInit, Inject, ViewChild, ElementRef, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { UserResponseData, Results, EducationData, ExperienceData } from '../../../core/models/user';
import { CountryService } from '../../../core/services/country.service';
import { UserService } from '../../../core/services/user.service';
import { UploadFileResponse } from '../../../core/models';
import { CertificateData } from '../../../core/models/certificates';
import { Location } from '@angular/common';
import { ProfileService } from '../../../core/services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpecialtiesModal } from '../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: "app-edit-profile",
    templateUrl: "edit-profile.view.html",
    styleUrls: ["edit-profile.view.scss"]
})
export class EditProfileView implements OnInit {
    @ViewChild("placesRef") placesRef: GooglePlaceDirective;
    public formattedAddress = "";
    public options = {
        //   type:["locality"],
        types: ['(cities)'],
        componentRestrictions:
        {
            country: ['AM', 'FR'],

        }
    }

    public removable = true;
    public user: UserResponseData;
    public role: string;
    public country: any;
    public filteredCountriesMultiple: any[];
    public filteredSpecialitesMultiple: any[];
    public profileFormGroup: FormGroup;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public localImage: string = "/assets/images/user-icon-image.png";
    public headerLocalImage: string = '/assets/images/user-icon-image.png';
    public loading: boolean = false;
    public router: boolean = false;
    public education = new FormArray([]);
    public experience = new FormArray([]);
    public certificates: CertificateData[] = [];
    public certificatesImage: string;
    public speciality = [];
    public url = [];
    public spacialityUrl = [];
    public countries = [];
    public educationItem: EducationData[] = [];
    public experienceItem: ExperienceData[] = [];
    public routerUrl: string;
    public _unsbscribe = new Subject<void>();
    public maleTab: string = "male";
    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    constructor(
        private _fb: FormBuilder,
        private _countryService: CountryService,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _profileService: ProfileService,
        private _location: Location,
        private _dialog: MatDialog,
        private _router: Router,
        private _activatedRouter: ActivatedRoute,

        @Inject("FILE_URL") public _fileUrl: string,
    ) {
        this.role = this._cookieService.get('role');
        this.user = this._userService.user;
        

        if (this._userService.user.data.avatar) {
            this.localImage = this._fileUrl + this._userService.user.data.avatar;
        }
        if (this._userService.user.data.cover) {
            this.headerLocalImage = this._fileUrl + this._userService.user.data.cover;
        }
        this.routerUrl = window.location.href;
    }

    ngOnInit() {
        this._formBuilder();
        this._setPatchValue();
        this._getCountries();
        this._getSpeciality();
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
            user_name: [null],
        })
    }

    private _setPatchValue(): void {

        this.profileFormGroup.patchValue({
            firstName: this.user.data.user.first_name,
            userName: this.user.data.user.last_name,
            status: this.user.data.status,
            facebook: this.user.data.facebook,
            youtube: this.user.data.youtube,
            instagram: this.user.data.instagram,
            linkedin: this.user.data.linkedin,
            location: this.user.data.location,
            user_name: this.user.data.slug,
        });


        this.educationItem = [];
        this.education = new FormArray([]);
        // if (this.user.data.education) {
        //     this.educationItem = this.user.data.education;
        //     this.educationItem.forEach(element => {
        //         this.education.push(new FormControl({
        //             name: element.name,
        //             specialization: element.specialization,
        //             start_date: Number(element.start_date),
        //             end_date: Number(element.end_date),
        //             url: element.url,
        //         }));
        //     });

        // }
        this.experienceItem = [];
        this.experience = new FormArray([]);
        // if (this.user.data.experience) {
        //     this.experienceItem = this.user.data.experience;
        //     this.experienceItem.forEach(element => {
        //         this.experience.push(new FormControl({
        //             name: element.name,
        //             specialization: element.specialization,
        //             start_date: Number(element.start_date),
        //             end_date: Number(element.end_date),
        //             url:element.url,
        //         }));
        //     });
        // }

        this.certificates = [];
        // if (this.user.data.certificates) {
        //     const certificates = this.user.data.certificates;
        //     certificates.forEach(element => {
        //         this.certificates.push({ description: element.description, file: element.file, url: element.url })
        //     });
        // }
    }

    private _getCoatch(): void {
        this._userService.getCoatch()
            .subscribe((data) => {
                this.user.data = data.data
                this._setPatchValue();

            })
    }

    private _getClient(): void {
        this._userService.getClient()
            .subscribe((data) => {
                this._setPatchValue();
            })
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

    private _putClient(file_name, type): void {
        if (type === 'avatar') {
            this._userService.user.data.avatar = file_name;
        } else {
            this._userService.user.data.cover = file_name;
        }
        if (this.role === 'client') {
            this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
                .pipe(takeUntil(this._unsbscribe))
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
                .pipe(takeUntil(this._unsbscribe))
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
    private _getCountries(): void {
        this._countryService.getLanguages()
            .pipe(takeUntil(this._unsbscribe))
            .subscribe((countries) => {
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

    private _getSpeciality(): void {
        this._countryService.getSpeciality()
            .pipe(takeUntil(this._unsbscribe))
            .subscribe((speciality) => {
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
            this.user.data.facebook = this.profileFormGroup.value.facebook,
            this.user.data.instagram = this.profileFormGroup.value.instagram,
            this.user.data.youtube = this.profileFormGroup.value.youtube,
            this.user.data.linkedin = this.profileFormGroup.value.linkedin,
            this.user.data.location = this.profileFormGroup.value.location,
            // this.user.data.education = this.education.value,
            // this.user.data.experience = this.experience.value,
            // this.user.data.certificates = this.certificates,
            this.user.data.language = this.url,
            this.user.data.speciality = this.spacialityUrl;
        this.user.data.slug = this.profileFormGroup.value.user_name,
            this._userService.putCoatch(this._userService.user.data.id, this.user.data)
                .pipe(takeUntil(this._unsbscribe))
                .subscribe((data) => {
                    this._userService.getCoatch().subscribe((data) => {

                        this.user.data = data.data;
                        this._router.navigate([`/profile/${this.user.data.slug}/coach`]);
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
        this.user.data.slug = this.profileFormGroup.value.user_name,
            this._userService.putClient(this._userService.user.data.id, this.user.data)
                .pipe(takeUntil(this._unsbscribe))
                .subscribe((data) => {
                    this._userService.getClient().subscribe((data) => {
                        this._router.navigate([`/profile/${this.user.data.slug}/client`]);
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

    public removeEducationItem(event, ind, item): void {
        if (event && item.value.url) {
            this._profileService.deleteProfileInformation(item.value.url, item.value)
                .pipe(takeUntil(this._unsbscribe))
                .subscribe((data) => {
                    if (this.role === 'client') {
                        this._getClient();
                    }
                    else {
                        this._getCoatch();
                    }


                })
        } else if (event) {
            this.education.controls.splice(ind, 1)
        }

    }

    public addExperience(): void {
        this.experience.push(new FormControl(''));
    }

    public removeExperianceItem(event, ind, item): void {
        if (event && item.value.url) {
            this._profileService.deleteProfileInformation(item.value.url, item.value)
                .pipe(takeUntil(this._unsbscribe))
                .subscribe((data) => {
                    if (this.role === 'client') {
                        this._getClient();
                    }
                    else {
                        this._getCoatch();
                    }


                })
        } else if (event) {
            this.experience.controls.splice(ind, 1)
        }
    }
    public copyReferralUrl() {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';   
        let conversionEncryptOutput = CryptoJS.AES.encrypt(this.user.data.user.id.toString(),'secret key').toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');       
        selBox.value = `http://uat.marathon.me/refferal/${conversionEncryptOutput}`;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    public setCeriticatesPhoto(event): void {
        if (event) {
            this._setFormDataCertifivatesImage(event);
        }
    }

    public addCertificates(): void {
        this.certificates.push({ file: this.certificatesImage, description: this.profileFormGroup.value.certificatesLocation });
        this.certificatesImage = '';
        this.profileFormGroup.patchValue({
            certificatesLocation: '',
        });
    }

    public removeCerticatesItem(event, ind, item): void {
        if (event && item.url) {
            this._profileService.deleteProfileInformation(item.url, item)
                .pipe(takeUntil(this._unsbscribe))
                .subscribe((data) => {
                    if (this.role === 'client') {
                        this._getClient();
                    }
                    else {
                        this._getCoatch();
                    }


                })
        } else if (event) {
            this.certificates.splice(ind, 1)
        }
    }
    public onClickShowSocialMedium(): void {
        if (this.showMore === true) {
            this.showMore = false;

        }
        this.showSocialMedium = !this.showSocialMedium;

    }
    public onClickShowMore(): void {
        if (this.showSocialMedium === true) {
            this.showSocialMedium = false;

        }
        this.showMore = !this.showMore;
    }

    public filterCountry(query: string, countries: Results[]): Results[] {
        let filtered: any[] = [];
        for (let item of countries) {
            if (item.name.toLowerCase().includes(query.toLowerCase().trim())) {
                filtered.push(item);
            }
        }
        return filtered;
    }

    public filterCountryMultiple(event): void {
        let query = event.query;
        this.filteredCountriesMultiple = this.filterCountry(query, this.countries);
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

    public onClickedOutside(event): void {
        this.showMore = false;
        this.showSocialMedium = false;
    }
    public copyUrl(): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.routerUrl;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    public onClickMaleTab(event): void {
        this.maleTab = event;
    }

    public openSpecialtiesModal(): void {
        let activeItem = this.profileFormGroup.value.speciality
        const dialogRef = this._dialog.open(SpecialtiesModal, {
            width: " 520px",
            data: {
                data: this.speciality,
                activeItem: activeItem,
            }
        })
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.profileFormGroup.patchValue({
                    speciality: data,
                })

            }


        })
    }
    selected(event: MatAutocompleteSelectedEvent): void {
        this.countries.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.profileFormGroup.value.languages.setValue(null);
    }


    public stopPropagation(event) {
        event.stopPropagation();
    }

    public handleAddressChange(address: any) {
        this.profileFormGroup.value.location = address.formatted_address;

    }
}













