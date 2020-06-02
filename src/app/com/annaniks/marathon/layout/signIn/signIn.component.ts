import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInResponse } from '../../core/models';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.services';

@Component({
    selector: "app-signIn",
    templateUrl: "signIn.component.html",
    styleUrls: ["signIn.component.scss"]
})

export class SignInComponent implements OnInit {
    public loading: boolean = false;
    public signInGroup: FormGroup;
    public errorMessage: string;
    public tab: number = 1;
    @Output() tabChanges = new EventEmitter();

    constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.signInGroup = this._fb.group({
            userName: [null, Validators.required],
            password: [null, Validators.required]
        })
    }
    private _signIn(): void {
        this.loading = true;
        this.signInGroup.disable();
        let signInResponse: SignInResponse =
        {
            username: this.signInGroup.value.userName,
            password: this.signInGroup.value.password,
        }
        this._authService.SignIn(signInResponse)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.signInGroup.enable();
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

    public chackIsValid(controlName: string): boolean {
        return this.signInGroup.get(controlName).hasError('required') && this.signInGroup.get(controlName).touched;
    }
    public onClickTab(tab): void {
        this.tab = tab;
        this.tabChanges.emit(this.tab);
        if (this.tab === 1) {
            this._signIn();
        }
    }


}