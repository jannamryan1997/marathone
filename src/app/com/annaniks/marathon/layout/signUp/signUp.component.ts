import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
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
    public tab: number = 1;
    public errorMessage: string;
    public loading: boolean = false;
    public signUpGroup: FormGroup;
    @Input() leftContent: string;
    @Output() changeSigntab = new EventEmitter;
    constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.signUpGroup = this._fb.group({
            firstName: ["wogipa4708", Validators.required],
            lastName: ["wogipa4708", Validators.required],
            userName: ["wogipa4708", Validators.required],
            email: ["wogipa4708@tashjw.com", Validators.required],
            password: ["wogipa4708", Validators.required],
        })
    }

    public onChangeAuthMain(event = this.tab) {
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
            user: {
                email: this.signUpGroup.value.email,
                password: this.signUpGroup.value.password,
                first_name: this.signUpGroup.value.firstName,
                last_name: this.signUpGroup.value.lastName,
            },
            google_id: null,
            ui_language: "http://annaniks.com:6262/api/utils/language/3/",
            metric: "http://annaniks.com:6262/api/utils/metric/1/",
        }
        this._authService.signUp(signInResponse)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.signUpGroup.enable();
                })
            )
            .subscribe((data) => {
                this.changeSigntab.emit(this.tab);
                console.log(data);
            },
                err => {
                    this.errorMessage = err.error;
                    console.log(err);

                }
            )

    }

    public onClickSignUp(): void {
        this._signUp();
    }
}