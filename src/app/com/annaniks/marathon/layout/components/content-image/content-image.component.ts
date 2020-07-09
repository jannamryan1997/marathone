import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: "app-content-image",
    templateUrl: "content-image.component.html",
    styleUrls: ["content-image.component.scss"]
})

export class ContentImageComponent implements OnInit {
    public fileUrl: string = environment.fileUrl;

    @Output('delete') private _isDelete: EventEmitter<boolean> = new EventEmitter()

    @Input() contentImageItem: any;
    @Input() contentImage;

    constructor() { }

    ngOnInit() { }

    public delete() {
        this._isDelete.emit(true)
    }
}