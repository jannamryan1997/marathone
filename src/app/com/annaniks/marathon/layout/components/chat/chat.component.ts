import { Component, Input, Inject, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']
})
export class ChatComponent {
    public item;
    private _defaultImage: string = '/assets/images/user-icon-image.png'
    @Output('closeItem') private _close = new EventEmitter()
    @Input('activeChat')
    set setActiveUserChat($event) {
        this.item = $event;
    }
    inputForm = this.fb.group({
        text: [],
    });
    constructor(@Inject('FILE_URL') public fileURL,private fb:FormBuilder) { }
    public getAvatar(item) {

        if (item && item.avatar) {
            // this.fileURL + 
            return item.avatar
        } else {
            return this._defaultImage
        }
    }
    public getLinkUrl(item) {
        return `/profile/${item.slug}/${item.role}`
    }
    public closeItem() {
        this._close.emit(true)
    }
}