import { Component, OnInit } from "@angular/core";

@Component({
    selector: "posts-view",
    templateUrl: "posts.view.html",
    styleUrls: ["posts.view.scss"]
})

export class PostsView implements OnInit {

    public postItem = [
        {
            postType: "text",
            title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora."
        },
        {
            postType: "image",
            image:"assets/images/foodimg.png"
        },

        {
            postType: "video",
            video:"assets/images/vido.mp4"
        },
        {
            postType: "combinations",
            image:"assets/images/img3.png",
        },
        {
            postType: "chicken",
            image:"assets/images/chicken.png",
        },
    ]
    constructor() { }

    ngOnInit() { }
}

