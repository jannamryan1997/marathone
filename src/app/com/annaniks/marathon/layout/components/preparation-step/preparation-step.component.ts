import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-preparation-step",
    templateUrl: "preparation-step.component.html",
    styleUrls: ["preparation-step.component.scss"]
})

export class PreparationStepComponent implements OnInit {

    @Input() index: number;

    constructor() { }

    ngOnInit() {}
}