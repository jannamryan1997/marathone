import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SignInResponse } from '../../../core/models';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: "registration-view",
    templateUrl: "registration.view.html",
    styleUrls: ["registration.view.scss"]
})

export class RegistrationView implements OnInit {
    public loading: boolean = false;
    public registrationForm: FormGroup;
    public errorMessage: string;

    constructor(private _fb: FormBuilder, private _authService: AuthService,private _router:Router) { }

    ngOnInit() {
        this._formBuilder();
    }
    private _formBuilder(): void {
        this.registrationForm = this._fb.group({
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            userName: [null, Validators.required],
            phone: [null, Validators.required],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required]
        },
            { validator: this._checkPasswords }
        )


    }
    private _checkPasswords(group: FormGroup) {
        let pass = group.get('password').value;
        let confirmPass = group.get('confirmPassword').value;

        return pass === confirmPass ? null : { notSame: true }
    }
    private _signIn(): void {
        this.loading = true;
        this.registrationForm.disable();
        // let signInResponse: SignInResponse =
        // {
            // username: this.registrationForm.value.userName,
            // phone: this.registrationForm.value.phone,
            // password: this.registrationForm.value.confirmPassword,
        }
        // this._authService.SignIn(signInResponse)
            // .pipe(
            //     finalize(() => {
            //         this.loading = false;
            //         this.registrationForm.enable();
            //     })
            // )
            // .subscribe((data) => {
            //     console.log(data);
            //     this._router.navigate(['auth/login'])

            // },
                // err => {
                   
                //     this.errorMessage = err.error;
                // }
            //)
      
    }

    // public checkIsValid(controlName: string): boolean {
    //     return this.registrationForm.get(controlName).hasError('required') && this.registrationForm.get(controlName).touched 
    // }

    // public onClickSignIn(): void {
    //     this._signIn();

    //}
//}

