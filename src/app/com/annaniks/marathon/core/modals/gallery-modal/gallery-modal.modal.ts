import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: "app-gallery-modal",
    templateUrl: "gallery-modal.modal.html",
    styleUrls: ["gallery-modal.modal.scss"]
})

export class GalleryModal implements OnInit, OnDestroy {
    public type: string;
    public mediaItem;
    public slideConfig = {};
    public videoSources = [];
    public user: UserData;
    public localImage: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data,
        @Inject('FILE_URL') public fileURL,
        private _userService: UserService,
    ) {
        this.mediaItem = this._data.data;
        this.type = this._data.type;
        // for (let item of this.mediaItem) {
        //     if (item.type === 'videoLink') {
        //         this.videoSources = [{
        //             src: item.url,
        //             provider: 'youtube',
        //         }]
        //     }
        // }
        this.slideConfig = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: false,
            autoplaySpeed: 2000
        }
        this.videoSources = [{
            src: this.mediaItem.url,
            provider: 'youtube',
        }]
        this.user = this._userService.user.data;
        this.localImage = this.fileURL + this.user.avatar;

    }

    ngOnInit() { }

    ngOnDestroy() { }
} 