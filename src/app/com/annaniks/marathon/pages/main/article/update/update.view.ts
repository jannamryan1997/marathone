import { Component, OnInit } from "@angular/core";

@Component({
    selector: "update-view",
    templateUrl: "update.view.html",
    styleUrls: ["update.view.scss"]
})

export class UpdateView implements OnInit {
    public ckeditorContent: string = '<p>Type Text Hear</p>';

    public contentImageItem = [
        { img: "assets/images/content-image.png" },
        { img: "assets/images/content-image.png" }
    ]

    constructor() { }

    ngOnInit() { }



    public setServicePhoto(event): void {
        if (event) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.contentImageItem.push({ img: e.target.result });
            };
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }

        }
    }

}