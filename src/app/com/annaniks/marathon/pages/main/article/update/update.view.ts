import { Component, OnInit } from "@angular/core";

@Component({
    selector: "update-view",
    templateUrl: "update.view.html",
    styleUrls: ["update.view.scss"]
})

export class UpdateView implements OnInit {
    ckeditorContent: string = '<p>Type Text Hear</p>';
    constructor() { }

    ngOnInit() { }

}