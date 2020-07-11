import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";


@Component({
    selector: "app-add-recipe-image",
    templateUrl: "add-recipe-image.component.html",
    styleUrls: ["add-recipe-image.component.scss"]
})

export class AddRecipeImageComponent implements OnInit {
    @Input() recipeImageItem;
    @Output() deleted = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    public removeItem(): void {
        this.deleted.emit(true);
    }
}