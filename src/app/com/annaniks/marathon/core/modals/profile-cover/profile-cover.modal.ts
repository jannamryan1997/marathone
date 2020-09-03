import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-profile-cover-modal',
    templateUrl: "profile-cover.modal.html",
    styleUrls: ["profile-cover.modal.scss"]
})

export class ProfileCoverModal implements OnInit {
public localImage:string;
    constructor(@Inject(MAT_DIALOG_DATA) private _data, private _matDialogRef:MatDialogRef<ProfileCoverModal>) {
        this.localImage=this._data.localImage;
     }

    ngOnInit() { 
    }
}