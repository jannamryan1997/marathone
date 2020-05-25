import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-comments",
    templateUrl: "comments.component.html",
    styleUrls: ["comments.component.scss"]
})

export class CommentsComponent implements OnInit {
    @Input() comments;
    @Input() type: string;
    public showReplay: boolean = false;

    constructor() { }

    ngOnInit() {
        console.log(this.comments, this.type);

    }

    public isOpenReplay(): void {
        this.showReplay = !this.showReplay;
        console.log(   this.showReplay );
        
    }
}
