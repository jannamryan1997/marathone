import { Component, OnInit } from "@angular/core";
import { RecipeResponseData, Slider } from '../../../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { AddIngridientImageModal } from '../../../../core/modals';

@Component({
    selector: "post-recipe-view",
    templateUrl: "post-recipe.view.html",
    styleUrls: ["post-recipe.view.scss"]
})

export class PostRecipeView implements OnInit {

    constructor() { }

    ngOnInit() { }


}