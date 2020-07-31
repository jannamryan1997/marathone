import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "app-gallery-modal",
    templateUrl: "gallery-modal.modal.html",
    styleUrls: ["gallery-modal.modal.scss"]
})

export class GalleryModal implements OnInit, OnDestroy {
    public mediItem;
    public type:string;
    public slideConfig = {};
    public videoSources = [];
    constructor(@Inject(MAT_DIALOG_DATA) private _data, @Inject('FILE_URL') public fileURL) {
        this.mediItem = this._data.data;
        this.type=this._data.type;
        for(let item of this.mediItem){
            if(item.type === 'videoLink'){
                this.videoSources = [{
                    src: item.url,
                    provider: 'youtube',
                }]
            }
        }
        this.slideConfig = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000
        }
    }

    ngOnInit() { }

    ngOnDestroy() { }
} 