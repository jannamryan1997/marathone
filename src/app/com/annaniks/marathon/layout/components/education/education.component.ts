import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-education",
    templateUrl: "education.component.html",
    styleUrls: ["education.component.scss"]
})

export class EducationComponent implements OnInit {
    @Input() education;
    @Input() profileEducation: boolean;
    @Input() index:number;
    constructor() { }

    ngOnInit() {
        console.log(this.education);
        
     }

     public removeEducation(){
         console.log(this.index);
         
this.education.splice(this.education,1);
     }
}