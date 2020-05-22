import { Component, OnInit } from "@angular/core";

@Component({
    selector: "combination-view",
    templateUrl: "combination.view.html",
    styleUrls: ["combination.view.scss"]
})

export class CombinationView implements OnInit {
    public isOpen: boolean = false;
    public comments = [
        {
            image: "assets/images/img8.png", name: "hanna mryan", time: "1 hour ago", message: "barevvvvvvvvv bari voxjuyn hiiiii", view: "2", like: "25", dislike: "6",
            chiled: [
                { image: "assets/images/img6.png", name: "maya davidov", time: "50 minutes ago", comments: "first comments", like: "5", dislike: "0" },
                { image: "assets/images/img1.png", name: "liana hego", time: "2 minute ago", comments: "secends comments", like: "12", dislike: "3" },
            ]
        },
    ]
    constructor() { }

    ngOnInit() { }


    public onClickOpen($event): void {
        this.isOpen=$event;
    }
}