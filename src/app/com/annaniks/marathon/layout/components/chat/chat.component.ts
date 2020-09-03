import { Component, Input, Inject, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, QueryList } from "@angular/core";
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']
})
export class ChatComponent {
    public item;
    private _defaultImage: string = '/assets/images/user-icon-image.png';
    inputForm = this.fb.group({
        text: [],
    });
    @Output('closeItem') private _close = new EventEmitter()

    @Input('activeChat')
    set setActiveUserChat($event) {
        this.item = $event;
    }

    public messages = [
        {
            role: 'friend',
            message: 'hellodgsdfgdfgddddddddddddddddd ghf hgfhg hfg ghg ghfgh h fhfghgfhfghfgh gdfgd dfsdf dsfdsf fsdgf'
        },
        {
            role: 'my',
            message: 'hi'
        }
    ]
    constructor(@Inject('FILE_URL') public fileURL, private fb: FormBuilder) { }

    ngOnInit() { }

    public getAvatar(item) {
        if (item && item.avatar) {
            // this.fileURL + 
            return item.avatar
        } else {
            return this._defaultImage
        }
    }
    /////
    public send() {
        if (this.inputForm.get('text').value) {
            this.messages.push(
                {
                    role: 'my',
                    message: this.inputForm.get('text').value
                }
            )
            this.inputForm.reset();
        }

    }
    /////
    public getLinkUrl(item) {
        return `/profile/${item.slug}/${item.role}`
    }
    public closeItem() {
        this._close.emit(true)
    }



}