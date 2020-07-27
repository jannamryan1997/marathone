import { Component, OnInit, OnDestroy, Input } from "@angular/core";

@Component({
    selector: "app-like-item",
    templateUrl: "like-item.component.html",
    styleUrls: ["like-item.component.scss"]
})

export class LiketemComponent implements OnInit, OnDestroy {
    public unfollow: boolean = false;
    constructor() { }

    ngOnInit() { }

    public onClickUnfollow():void{
        this.unfollow =! this.unfollow;
    }

    ngOnDestroy() { }
}