import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-status-card-item",
    templateUrl: "status-card-item.component.html",
    styleUrls: ["status-card-item.component.scss"]
})

export class StatusCardItemComponent implements OnInit {
    @Input() text: boolean;
    @Input() image: boolean;
    public show: boolean;
    public title: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora."
    constructor() {

    }

    ngOnInit() {
        console.log(this.text);

    }
    public onClickSeeMore(): void {
        this.show = !this.show;
    }
}