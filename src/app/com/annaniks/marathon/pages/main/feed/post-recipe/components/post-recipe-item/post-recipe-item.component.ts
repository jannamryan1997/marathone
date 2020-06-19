import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: "app-post-recipe-item",
    templateUrl: "post-recipe-item.component.html",
    styleUrls: ["post-recipe-item.component.scss"]
})

export class PostRecipeItemComponent implements OnInit {
    public emojiForm: FormGroup;
    public showemoji: boolean = false;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.emojiForm = this._fb.group({
            inputField: ["Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis ab repudiandae sint et qui at ea totam ad ex cum? A delectus minima repudiandae eius velit et quo itaque aliquam?"],
        })
    }

    addEmoji($event) {
        let data = this.emojiForm.get('inputField');
        data.patchValue(data.value + $event.emoji.native)
    }

    public showEmoji(): void {
        this.showemoji = !this.showemoji;
    }

}