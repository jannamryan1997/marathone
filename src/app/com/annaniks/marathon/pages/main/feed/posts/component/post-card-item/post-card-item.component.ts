import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PropertyModal } from 'src/app/com/annaniks/marathon/core/modals';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: "app-post-card-item",
    templateUrl: "post-card-item.component.html",
    styleUrls: ["post-card-item.component.scss"]
})

export class PostCardItemComponent implements OnInit {
    @Input() text: boolean;
    @Input() image: boolean;
    @Input() combinations: boolean;
    @Input() chicken: boolean;
    @Input() video: boolean;
    public show: boolean;
    public emojiForm: FormGroup;
    public showemoji: boolean = false;
    public showComments: boolean = false;
    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]
    public title: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora."

    constructor(private _matDialog: MatDialog, private _fb: FormBuilder) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.emojiForm = this._fb.group({
            inputField: [""],
        })
    }

    public onClickSeeMore(): void {
        this.show = !this.show;
    }


    public openPropertyModalByImage(): void {
        const dialogRef = this._matDialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "1280px",
            data: {
                type: 'image',
            }
        })
    }

    public openPropertyModalByVideo(): void {
        const dialogRef = this._matDialog.open(PropertyModal, {
            width: "100%",
            maxWidth: "1280px",
            data: {
                type: 'video',
            }
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

    public showComment(): void {
        this.showComments = !this.showComments;
    }

}