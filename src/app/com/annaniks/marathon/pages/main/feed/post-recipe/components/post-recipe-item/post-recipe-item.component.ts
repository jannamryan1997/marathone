import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: "app-post-recipe-item",
    templateUrl: "post-recipe-item.component.html",
    styleUrls: ["post-recipe-item.component.scss"]
})

export class PostRecipeItemComponent  {
    // public emojiForm: FormGroup;
    // public showemoji: boolean = false;
    // @Input() postItem:ReceiptResponseData;

    // constructor(private _fb: FormBuilder) { }

    // ngOnInit() {
    //     this._formBuilder();
    //     this._setPatchValue(); 
    // }

    // private _formBuilder(): void {
    //     this.emojiForm = this._fb.group({
    //         inputField: [null],
    //     })
    // }

    // private _setPatchValue():void{
    //     this.emojiForm.patchValue({
    //         inputField:this.postItem.title,
    //     })
    // }

    // public addEmoji($event):void {
    //     let data = this.emojiForm.get('inputField');
    //     data.patchValue(data.value + $event.emoji.native)
    // }

    // public showEmoji(): void {
    //     this.showemoji = !this.showemoji;
    // }

}