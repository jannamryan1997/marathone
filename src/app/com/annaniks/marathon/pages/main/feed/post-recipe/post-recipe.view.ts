import { Component, OnInit } from "@angular/core";

@Component({
    selector: "post-recipe-view",
    templateUrl: "post-recipe.view.html",
    styleUrls: ["post-recipe.view.scss"]
})

export class PostRecipeView implements OnInit {
    public postItem = [{},{},{}]
    constructor() { }

    ngOnInit() { }
}