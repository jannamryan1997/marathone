import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";


@Component({
    selector: "app-experience",
    templateUrl: "experience.component.html",
    styleUrls: ["experience.component.scss"]
})
export class ExperienceComponent implements OnInit {

    @Input() profileExperience: boolean;
    @Input() experience;
    @Output() deleted = new EventEmitter<any>()

    constructor() { }

    ngOnInit() { }

    public deleteExperiance(): void {
        this.deleted.emit(true);
    }
}