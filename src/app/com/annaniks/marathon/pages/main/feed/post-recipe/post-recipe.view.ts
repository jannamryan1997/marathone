import { Component, OnInit } from "@angular/core";
import { RecipeResponseData } from '../../../../core/models';

@Component({
    selector: "post-recipe-view",
    templateUrl: "post-recipe.view.html",
    styleUrls: ["post-recipe.view.scss"]
})

export class PostRecipeView implements OnInit {
    public postItem:RecipeResponseData[] = [
        {
            img: "assets/images/img3.png",
            title: "",
            video: "",
        },
        {
            img: "assets/images/feed-item-img.png",
            title: "Lorem ipsum dolor, sit amet consectetur adipisicingdelectu aliquam?",
            video: "",
        },

        {
            img: "",
            title: "barev",
            video: "assets/images/vido.mp4",
        },
        {
            img: "assets/images/img3.png",
            title: "",
            video: "",
        },
      

    ]
    constructor() { }

    ngOnInit() { }
}