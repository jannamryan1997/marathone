import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: "app-auth",
    templateUrl: "auth.modal.html",
    styleUrls: ["auth.modal.scss"]
})

export class AuthModal implements OnInit {
    public tab: number = 1;
    public token: string;
    public message:string;
    @Output() sentToken=new EventEmitter<any>();
    constructor(private _matDialogRef: MatDialogRef<AuthModal>, @Inject(MAT_DIALOG_DATA) private _data) {
        if(this._data && this._data.value){
            this.message=this._data.value;
        }
        
        if(this._data && this._data.token){
            this.token = this._data.token;
        }
    }

    ngOnInit() {
        if ( this.message=== 'login') {
            this.tab = 1;
        }
        else if ( this.message === 'registration') {
            this.tab = 2;
        }
        if(this.token){
            this.tab=3;
        }
    }

    public onChangeTab(event): void {
        this.tab = event;
    }
    public onClickOpenSignIn(event): void {
        this.tab = event;
    }
    public closeModal(): void {
        this._matDialogRef.close();
    }

    public closeAuthModal(event): void {
        if (event) {
            this._matDialogRef.close(true);
        }
    }

}