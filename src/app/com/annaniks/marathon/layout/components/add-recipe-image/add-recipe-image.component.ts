import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-add-recipe-image",
    templateUrl: "add-recipe-image.component.html",
    styleUrls: ["add-recipe-image.component.scss"]
})

export class AddRecipeImageComponent implements OnInit {
    @Input() recipeImageItem;

    constructor() { }

    ngOnInit() { 
        console.log(this.recipeImageItem,"hhhhhhhhhhhhh");
        
    }
}