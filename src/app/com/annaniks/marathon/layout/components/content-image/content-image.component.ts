import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-content-image",
    templateUrl: "content-image.component.html",
    styleUrls: ["content-image.component.scss"]
})

export class ContentImageComponent implements OnInit {

    @Input() contentImageItem: any;
    @Input() contentImage;

    constructor() { }

    ngOnInit() { }

    // public deletItem(): void {
    //     this.contentImage.map((element, item) => {
    //         this.contentImage.splice(item, 1);
    //     })
    //     console.log(this.contentImage);

    // }
}