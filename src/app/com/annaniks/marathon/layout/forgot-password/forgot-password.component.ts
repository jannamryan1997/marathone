import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from '../../core/services/auth.services';
import { Router } from '@angular/router';

@Component({
    selector: "app-forgot-password",
    templateUrl: "forgot-password.component.html",
    styleUrls: ["forgot-password.component.scss"]
})

export class ForgotPasswordComponent implements OnInit, OnDestroy {
    public tab: number = 1;
    public loading:boolean=false;
    public changePasswordGroup: FormGroup;
    public show: boolean = false;
    public hidePassword: boolean = true;
    public showRepeatPassword: boolean = false;
    public hiderepPassword: boolean = true;
    @Output() changeSigntab = new EventEmitter;
    constructor(private _fb: FormBuilder, private _authUserService: AuthUserService, private _router: Router) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.changePasswordGroup = this._fb.group({
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            password: [null, Validators.required],
            repeatPassword: [null, Validators.required],
        },
            { validator: this.checkPasswords }
        )

    }

    checkPasswords(group: FormGroup) {
        let pass = group.get('password').value;
        let confirmPass = group.get('repeatPassword').value;

        return pass === confirmPass ? null : { notSame: true }
    }
    public onChangeAuthMain(event = this.tab): void {
        this.changeSigntab.emit(event);
    }

    public showPasswordValue(): void {
        this.show = true;
        this.hidePassword = false;
    }

    public showRepeatPasswordValue(): void {
        this.showRepeatPassword = true;
        this.hiderepPassword = false;
    }

    public hideRepeatPassword(): void {
        this.showRepeatPassword = false;
        this.hiderepPassword = true;
    }
    public hide(): void {
        this.show = false;
        this.hidePassword = true;
    }

    public chackIsValid(controlName): boolean {
        return this.changePasswordGroup.get(controlName).hasError('required') && this.changePasswordGroup.get(controlName).touched;
    }

    public onClickSavePassword(): void {
        this._authUserService.forgotPassword({
            name: this.changePasswordGroup.value.email,
            password: this.changePasswordGroup.value.password,
        })
            .subscribe((data) => {
                console.log(data);

            })
    }

    ngOnDestroy() { }
}