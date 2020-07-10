import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-content-video",
    templateUrl: "content-video.component.html",
    styleUrls: ["content-video.component.scss"]
})

export class ContentVideoComponent implements OnInit {
    public videoSources = [];
    @Output('delete') private _isDelete: EventEmitter<boolean> = new EventEmitter()

    @Input('source')
    set setSource(event) {
        if (event && event.link) {
            this.videoSources = [{
                src: event.link,
                provider: 'youtube',
            }]
        }
    }
    constructor() { }
    
    public delete(){
        this._isDelete.emit(true)
    }
    ngOnInit() { }
}