import { Component, OnInit, Input, Inject, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-galery",
    templateUrl: "gallery.component.html",
    styleUrls: ["gallery.component.scss"]
})

export class GelleryComponent implements OnInit {
    public imageUrl: string;
    public videoUrl: string;
    public videoSources = [];
    public feedItem;
    public mediaItem;
    @Output() showGalleryModal=new EventEmitter<any>();
    @Input('mediaItem')
    set setmediaItem($event) {
        this.feedItem = $event;
     
    
        if ( this.feedItem) {
            this.mediaItem=this.feedItem.feed_media[0].content;
            console.log(this.mediaItem);
            if (this.mediaItem.type === 'image') {
                this.imageUrl = this._fileUrl + this.mediaItem.url;
            }

            if (this.mediaItem.type === 'video') {
                this.videoUrl = this._fileUrl + this.mediaItem.url;
            }
            if (this.mediaItem.type === 'videoLink') {
                this.videoSources = [{
                    src: this.mediaItem.url,
                    provider: 'youtube',
                }]
            }
        }
    }

    constructor(@Inject("FILE_URL") private _fileUrl) { }


    public openGalleryModal(): void {
        this.showGalleryModal.emit(true);
    }
    
    ngOnInit() {}
}