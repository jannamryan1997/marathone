import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-ingridient-item",
    templateUrl: "ingridient-item.component.html",
    styleUrls: ["ingridient-item.component.scss"]
})

export class IngridientItemComponent implements OnInit {
    @Input() titleItem;
    constructor() { }

    ngOnInit() { }
}