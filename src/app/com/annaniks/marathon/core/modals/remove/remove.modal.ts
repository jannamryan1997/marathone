import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "app-remove",
    templateUrl: "remove.modal.html",
    styleUrls: ["remove.modal.scss"]
})

export class RemoveModal implements OnInit, OnDestroy {

    constructor(private _matDialogRef: MatDialogRef<RemoveModal>) { }

    ngOnInit() { }

    public onClickCloseModal(): void {
        this._matDialogRef.close();
    }

    public onClickDeletedIte():void{
        this._matDialogRef.close('deleted');
    }

    ngOnDestroy() { }
}