import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../../../core/models';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: "login-view",
    templateUrl: "login.view.html",
    styleUrls: ["login.view.scss"]
})

export class LoginView implements OnInit {

    public loginForm: FormGroup;
    public loading: boolean = false;
    public errorMessage: string;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.loginForm = this._fb.group({
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            password: [null, Validators.required]
        })
    }
    private _login(): void {
        this.loading = true;
        this.loginForm.disable();
        let loginResponse: LoginResponse =
        {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }
        this._authService.login(loginResponse)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.loginForm.enable();
                }),
            )
            .subscribe((data) => {
                console.log(data);
                this._router.navigate(["/home"]);
            })
        err => {
            this.errorMessage = err.error;
        }
    }

    public chackIsValid(controlName: string): boolean {
        return this.loginForm.get(controlName).hasError('required') && this.loginForm.get(controlName).touched;
    }

    public onClickLogin(): void {
        this._login();
    }
}