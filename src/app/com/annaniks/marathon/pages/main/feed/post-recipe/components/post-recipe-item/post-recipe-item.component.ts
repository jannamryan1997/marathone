import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeResponseData } from 'src/app/com/annaniks/marathon/core/models';

@Component({
    selector: "app-post-recipe-item",
    templateUrl: "post-recipe-item.component.html",
    styleUrls: ["post-recipe-item.component.scss"]
})

export class PostRecipeItemComponent implements OnInit {
    public emojiForm: FormGroup;
    public showemoji: boolean = false;
    @Input() postItem:RecipeResponseData;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this._formBuilder();
        this._setPatchValue();
        console.log(this.postItem,"hhhhhhhhhhhhhhhhhhh");
        
    }

    private _formBuilder(): void {
        this.emojiForm = this._fb.group({
            inputField: [null],
        })
    }

    private _setPatchValue():void{
        this.emojiForm.patchValue({
            inputField:this.postItem.title,
        })
    }

    public addEmoji($event):void {
        let data = this.emojiForm.get('inputField');
        data.patchValue(data.value + $event.emoji.native)
    }

    public showEmoji(): void {
        this.showemoji = !this.showemoji;
    }

}