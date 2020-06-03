import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "app-auth",
    templateUrl: "auth.modal.html",
    styleUrls: ["auth.modal.scss"]
})

export class AuthModal implements OnInit {
    public tab: number = 1;
    constructor(private _matDialogRef: MatDialogRef<AuthModal>) { }

    ngOnInit() { }

    public onChangeTab(event): void {
        this.tab = event;
    }
    public onClickOpenSignIn(event): void {
        this.tab = event;
    }
    public closeModal(): void {
        this._matDialogRef.close();
    }

    public closeAuthModal(event):void{
        console.log(event);
        
        if(event){
            this._matDialogRef.close();
        }
    }
}