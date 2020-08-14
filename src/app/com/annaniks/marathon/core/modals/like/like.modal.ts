import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LikeService } from '../../services/like.service';
import { LikeResponseData } from '../../models/like';

@Component({
    selector: "app-like",
    templateUrl: "like.modal.html",
    styleUrls: ["like.modal.scss"]
})

export class LikeModal implements OnInit, OnDestroy {
    public feedId: string;
    public likeItem;
    public count: number;
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data,
        private _mathDialog: MatDialogRef<LikeModal>,
        private _likeService: LikeService) {
        this.feedId = _data.data;
    }

    ngOnInit() {
        this._getLike();
    }

    public onClickCloseModal(): void {
        this._mathDialog.close();
    }

    public _getLike(): void {
        this._likeService.getLike(this.feedId).subscribe((data: LikeResponseData) => {
            this.likeItem = data.results;

            this.count = data.count;

        })
    }

    ngOnDestroy() { }
}