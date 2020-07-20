import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: "app-posts-comments",
    templateUrl: "posts-comments.component.html",
    styleUrls: ["posts-comments.component.scss"]
})

export class PostsComments implements OnInit {
    public emojiForm: FormGroup;
    public showemoji: boolean = false;
    public comments = []
    @Input('comments')
    set setComments($event) {
        this.comments = $event
    }
    @Output('sendMessage') private _sendMessage: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _fb: FormBuilder,private cd: ChangeDetectorRef) { }

    ngOnInit() {

        this._formBuilder();
    }

    private _formBuilder(): void {
        this.emojiForm = this._fb.group({
            inputField: ['', Validators.required],
        })
    }

    addEmoji($event) {
        let data = this.emojiForm.get('inputField');
        data.patchValue(data.value + $event.emoji.native)
    }

    public showEmoji(): void {
        this.showemoji = !this.showemoji;
    }


    public addInput(event) {
        if (this.emojiForm.valid) {
            this._sendMessage.emit(this.emojiForm.value.inputField);
            this.emojiForm.reset();
        }
    }

    public onClickedOutside(event): void {
        this.showemoji = false;
    }
}