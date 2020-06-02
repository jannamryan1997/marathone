import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';

@Component({
    selector: "app-signUp",
    templateUrl: "signUp.component.html",
    styleUrls: ["signUp.component.scss"]
})

export class SignUpComponent implements OnInit {
    public errorMessage: string;
    public loading: boolean = false;
    public signUpGroup: FormGroup;
    @Output() changeSigntab = new EventEmitter;
    constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.signUpGroup = this._fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            userName: [null, Validators.required],
            email: [null, Validators.required],
            password: [null, Validators.required],
        })
    }

    public onChangeAuthMain(event) {
        this.changeSigntab.emit(event);
    }
    public chackIsValid(controlName: string): boolean {
        return this.signUpGroup.get(controlName).hasError('required') && this.signUpGroup.get(controlName).touched;
    }



    private _signUp(): void {
        this.loading = true;
        this.signUpGroup.disable();
        let signInResponse =
        {
            username: this.signUpGroup.value.userName,
            email: this.signUpGroup.value.email,
            phone: this.signUpGroup.value.phone,
            password: this.signUpGroup.value.confirmPassword,
        }
        this._authService.signUp(signInResponse)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.signUpGroup.enable();
                })
            )
            .subscribe((data) => {
                console.log(data);
                this._router.navigate(['auth/login'])

            },
                err => {

                    this.errorMessage = err.error;
                }
            )

    }

    public onClickSignUp(): void {
        this._signUp();
    }
}