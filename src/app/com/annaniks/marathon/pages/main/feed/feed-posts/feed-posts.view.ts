import { Component, OnInit } from "@angular/core";

@Component({
    selector: "feed-posts-view",
    templateUrl: "feed-posts.view.html",
    styleUrls: ["feed-posts.view.scss"]
})

export class FeedPostsView implements OnInit {

    public postItem = [
        {
            video: '',
            image: '',
            videoLink:"",
            text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis deleniti mollitia aut suntdolorum odit modi dolore ratione beatae quisquam consequuntur sed, amet optio doloribus inventore deseruntillo incidunt tempora."
        },
        {

            image: "assets/images/foodimg.png",
            video: '',
            text: '',
            videoLink:""
        },

        {
            image: '',
            video: "assets/images/vido.mp4",
            text: '',
            videoLink:""
        },
        {

            image: "assets/images/img3.png",
            video: '',
            text: 'barevvvvvvvvvv',
            videoLink:""
        },

        // {
        //     postType: "chicken",
        //     image: "assets/images/chicken.png",
        // },
    ]
    constructor() { }

    ngOnInit() { }
}

