import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: "app-profile",
    templateUrl: "profile.view.html",
    styleUrls: ["profile.view.scss"]
})
export class ProfileView implements OnInit {

    // public profuleFormGroup:FormGroup;

    constructor(private _fb:FormBuilder) { }

    ngOnInit() { 
        // this._formBuilder();
    }

    // private _formBuilder():void{
    //     this.profuleFormGroup=this._fb.group({
    //         fullName:[null,Validators.required],
    //         userName:[null,Validators.required]
    //     })
    // }
}