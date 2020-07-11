import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-education",
    templateUrl: "education.component.html",
    styleUrls: ["education.component.scss"]
})

export class EducationComponent implements OnInit {
    @Input() education;
    @Input() profileEducation: boolean;
    @Output() deleted = new EventEmitter<any>();

    constructor() { }


    ngOnInit() { }
    
    public deleteEducationItem(): void {
        this.deleted.emit(true);
    }

}