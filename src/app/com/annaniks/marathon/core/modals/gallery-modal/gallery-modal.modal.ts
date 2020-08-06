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
    public mediaItem = [];
    public slideConfig = {};
    public videoSources = [];
    public user: UserData;
    public localImage: string;
    public feedItem;
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data,
        @Inject('FILE_URL') public fileURL,
        private _userService: UserService,
    ) {
        this.type = this._data.type;
        this.feedItem = this._data.data;
        if(  this.feedItem){
            this.mediaItem.push(this.feedItem.feed_media[0].content);
        }
  
      
     
     

        // for (let item of this.mediaItem) {
        //     if (item.type === 'videoLink') {
        //         this.videoSources = [{
        //             src: item.url,
        //             provider: 'youtube',
        //         }]
        //     }
        // }

        // for (let item of this.feedItem) {
        //     for (let media of item.feed_media) {
        //         if (typeof media.content == 'string') {
        //             media.content = JSON.parse(media.content);
        //             this.mediaItem.push(media.content);
        //         }
        //     }
        // }

        this.videoSources = [{
            src: this.mediaItem[0].url,
            provider: 'youtube',
        }]
        this.user = this._userService.user.data;
        this.localImage = this.fileURL + this.user.avatar;

    }

    ngOnInit() { }

    ngOnDestroy() { }
} 