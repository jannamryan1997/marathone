import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "app-like",
    templateUrl: "like.modal.html",
    styleUrls: ["like.modal.scss"]
})

export class LikeModal implements OnInit, OnDestroy {

    constructor(private _mathDialog: MatDialogRef<LikeModal>) { }

    ngOnInit() { }

    public onClickCloseModal(): void {
        this._mathDialog.close();
    }

    ngOnDestroy() { }
}