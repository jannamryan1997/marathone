import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: "app-posts-comments",
    templateUrl: "posts-comments.component.html",
    styleUrls: ["posts-comments.component.scss"]
})

export class PostsComments implements OnInit {
    public emojiForm: FormGroup;
    public showemoji: boolean = false;
    @Input() comments;
    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        console.log(this.comments,"post-comments");
        
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.emojiForm = this._fb.group({
            inputField: [""],
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
        this.comments.map((element, index) => {
            this.comments.push(
                {
                    image: "assets/images/img.4.png",
                    chiled: [],
                    dislike: "0",
                    like: "0",
                    message: this.emojiForm.value.inputField,
                    name: "gevorg gevorgyan",
                    time: "1 minute ago",
                    view: "1"
                })

        })

        this.emojiForm.patchValue({
            inputField: "",
        })
    }

    public onClickedOutside(event): void {
        this.showemoji = false;
    }
}