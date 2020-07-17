import { Component, OnInit, Output, EventEmitter } from "@angular/core";


@Component({
    selector: "app-delete-feed-item",
    templateUrl: "delete-feed-item.component.html",
    styleUrls: ["delete-feed-item.component.scss"]
})

export class DeleteFeedItemComponent implements OnInit {
    @Output() deleted = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    public deletedFeedItem(): void {
        this.deleted.emit(true);
    }

}