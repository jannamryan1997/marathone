import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector:"app-education",
    templateUrl:"education.component.html",
    styleUrls:["education.component.scss"]
})

export class EducationComponent implements OnInit{
@Input() profileEducation:boolean;
    constructor(){}

    ngOnInit(){}
}