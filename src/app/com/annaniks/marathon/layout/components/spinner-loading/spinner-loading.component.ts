import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "spinner-loading",
    templateUrl: "spinner-loading.component.html",
    styleUrls: ["spinner-loading.component.scss"]
})

export class SpinnerLoadingComponent implements OnInit {
    @Input() profileLoading: boolean;
    constructor() { }

    ngOnInit() { }
}