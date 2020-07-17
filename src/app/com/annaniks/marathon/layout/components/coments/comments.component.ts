import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-comments",
    templateUrl: "comments.component.html",
    styleUrls: ["comments.component.scss"]
})

export class CommentsComponent implements OnInit {
    public comments;
    @Input('comments')
    set setComment($event) {
        this.comments = $event
    }
    @Output('likeOrDislike') private _isLikeOrDislike: EventEmitter<string> = new EventEmitter()
    @Input() type: string;
    public showReplay: boolean = false;

    constructor() { }

    ngOnInit() { }

    public isOpenReplay(): void {
        this.showReplay = !this.showReplay;
    }
    public vote(type: string) {        
        this._isLikeOrDislike.emit(type)
    }
}

