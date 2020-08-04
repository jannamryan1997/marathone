import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from '../../core/services/auth.services';
import { Router, ActivatedRoute } from '@angular/router';

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
    public token:string;
    public message:boolean=false;
    @Output() changeSigntab = new EventEmitter;
    constructor(
        private _fb: FormBuilder, 
        private _authUserService: AuthUserService, 
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        ) { }

    ngOnInit() {
        this._formBuilder();
        this._checkQueryParams();
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

    private _checkQueryParams(): void {
        let params = this._activatedRoute.snapshot.queryParams;
        if (params && params.token) {
            this.token = params.token;


        }

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
            password: this.changePasswordGroup.value.password,
            token:this.token,
        })
            .subscribe((data) => {
                this.onChangeAuthMain(this.tab);
                console.log(data);
                this._router.navigate([], {queryParams: {page: null}});

            })
    }

    public sendEmail():void{
    this._authUserService.sendEmail({
        email:this.changePasswordGroup.value.email
    })
    .subscribe((data)=>{
        this.message=true;
        console.log(data);
        
    })
    }

    ngOnDestroy() { }
}