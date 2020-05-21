import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: "ingridient-view",
    templateUrl: "ingridient.view.html",
    styleUrls: ["ingridient.view.scss"]
})

export class IngridientViewComponent implements OnInit {
    public emojiForm: FormGroup;
    public showemoji: boolean = false;
    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
        // {
        //     image: "assets/images/img5.png", name: "Varduhi nardanyan", time: "40 minutes ago", message: "secend message for item marathone", view: "14",like:"50",dislike:"16",
        //     chiled: []
        // }
    ]
    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
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