import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-create-publication",
    templateUrl: "create-publication.component.html",
    styleUrls: ["create-publication.component.scss"]
})

export class CreatePublicationComponent implements OnInit {
    @Input() postItem;
    public type: string;
    constructor() { }

    ngOnInit() { }

    public createdPost(): void {
        this.postItem.map((element, index) => {
            this.postItem.push(
                {

                    postType: "text",
                    title:this.type,

                }
            )
        })
        console.log(this.postItem);

    }
}
