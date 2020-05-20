import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { PropertyModal } from 'src/app/com/annaniks/marathon/core/modals';

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
    public title: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora."

    constructor(private _matDialog: MatDialog) { }

    ngOnInit() { }

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
}