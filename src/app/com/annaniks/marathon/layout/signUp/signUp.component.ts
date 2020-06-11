import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUserService } from '../../core/services/auth.services';
import { SocialUser, FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { ProfileUserService } from '../../core/services/user.service';

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
    public user: SocialUser;
    public loggedIn: boolean;
    @Output() changeSigntab = new EventEmitter;
    @Output() closeModal = new EventEmitter();
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _authUserService: AuthUserService,
        private _cookieService: CookieService,
        private _profileUserService: ProfileUserService,
        private _socialAuthService: AuthService,
    ) { }

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

    public onChangeAuthMain(event = this.tab) {
        this.changeSigntab.emit(event);
    }
    public chackIsValid(controlName: string): boolean {
        return this.signUpGroup.get(controlName).hasError('required') && this.signUpGroup.get(controlName).touched;
    }



    private _signUp(): void {
        this.loading = true;
        this.signUpGroup.disable();
        let signUpData =
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
        this._authUserService.signUp(signUpData)
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

    signInWithFB(): void {
        this._socialAuthService.authState.subscribe((user) => {
            if (this.loggedIn = (user != null)) {
                this._profileUserService.user = user;
                this._profileUserService.isAuthorized = true;
                this.closeModal.emit('true');
                this._cookieService.set("fbUser", "true");
            }
            console.log(this._profileUserService.user, "this.loggedInkkkkkkk");



        });
        this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

    }

    signInWithGoogle(): void {
        this._socialAuthService.authState.subscribe((user) => {
            if (this.loggedIn = (user != null)) {
                this._profileUserService.user = user;
                this._profileUserService.isAuthorized = true;
                this.closeModal.emit('true');
                this._cookieService.set("googleUser", "true");
            }
        });
        this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    }





    public onClickSignUp(): void {
        this._signUp();
    }
}