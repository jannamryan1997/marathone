import { Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { UserResponseData } from '../../../core/models/user';
import { UploadFileResponse } from '../../../core/models';

@Component({
    selector: "profile-view",
    templateUrl: "profile.view.html",
    styleUrls: ["profile.view.scss"]
})

export class ProfileView implements OnInit {

    public role: string;
    public showSocialMedium: boolean = false;
    public showMore: boolean = false;
    public showProfile: boolean = false;
    public router: boolean = false;
    public loading: boolean = false;
    public localImage: string = '/assets/images/user-icon-image.png';
    public postItem = [
        {
            postType: "image",
            image: "assets/images/foodimg.png"
        },

        {
            postType: "combinations",
            image: "assets/images/img3.png",
        }
    ]

    constructor(private _router: Router,
        private _userService: UserService,
        private _cookieService: CookieService) {
        this.role = this._cookieService.get('role');
        if (this._userService.user.data.avatar) {
            // this.localImage = 'http://192.168.1.115:9000/media/' + this._profileUserService.user.data.avatar;
            this.localImage = 'http://annaniks.com:6262/media/' + this._userService.user.data.avatar;
        }
console.log(this._userService.user);


    }

    ngOnInit() { }




    // private _setFormDataForImage(image) {
    //     if (image && image.target) {
    //         const formData = new FormData();
    //         let fileList: FileList = image.target.files;
    //         if (fileList.length > 0) {
    //             let file: File = fileList[0];
    //             formData.append('file', file, file.name);

    //             this._userService.uploadVideoFile(formData)
    //                 .subscribe((data: UploadFileResponse) => {
    //                     this._putClient(data.file_name);
    //                     this.loading = false;
    //                 })
    //         }
    //     }
    // }

    // private _putClient(file_name): void {
    //     this._userService.user.data.avatar = file_name;
    //     if (this.role === 'client') {
    //         this._userService.putClient(this._userService.user.data.id, this._userService.user.data)
    //             .subscribe((data) => {
    //                 this._userService.getClient().subscribe((data) => {
    //                     this.localImage = 'http://annaniks.com:6262/media/' + data.data.avatar;

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
    //                     this.localImage = 'http://annaniks.com:6262/media/' + data.data.avatar;

    //                 });


    //             })
    //     }
    // }

    // public setServicePhoto(event) {
    //     this.loading = true;
    //     if (event) {
    //         this._setFormDataForImage(event);

    //     }

    // }

    public onClickShowSocialMedium(): void {
        this.showSocialMedium = !this.showSocialMedium;
    }
    public onClickShowMore(): void {
        this.showMore = !this.showMore;
    }

    public reloadProfile() {
        this.showProfile = !this.showProfile;
    }
}
