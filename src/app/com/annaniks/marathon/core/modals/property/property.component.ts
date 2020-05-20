import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "app-property",
    templateUrl: "property.component.html",
    styleUrls: ["property.component.scss"]
})

export class PropertyModal implements OnInit {
    public show: boolean = false;
    public type: string;
    public title: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora."
    constructor(@Inject(MAT_DIALOG_DATA) private _data) {
        this.type = _data.type;
        console.log(this.type);

    }

    ngOnInit() { }

    public onClickSeeMore(): void {
        this.show = !this.show;
    }
}