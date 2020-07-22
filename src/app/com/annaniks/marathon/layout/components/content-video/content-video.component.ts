import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-content-video",
    templateUrl: "content-video.component.html",
    styleUrls: ["content-video.component.scss"]
})

export class ContentVideoComponent implements OnInit {
    public videoSources = [];
    public isShowDeleButton: boolean = false;
    @Output('delete') private _isDelete: EventEmitter<boolean> = new EventEmitter()
    @Input('isShowDelete')
    set setIsShowDeleButton($event) {
        this.isShowDeleButton = $event
    }
    @Input('source')
    set setSource(event) {
        if (event) {          
            this.videoSources = [{
                src: event,
                provider: 'youtube',
            }]
        }
    }
    constructor() { }

    public delete() {
        this._isDelete.emit(true)
    }
    ngOnInit() { }
}