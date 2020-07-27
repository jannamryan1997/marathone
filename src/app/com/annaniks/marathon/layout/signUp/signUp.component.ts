import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUserService } from '../../core/services/auth.services';
import { SocialUser, FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../core/services/user.service';

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
    public profileUser;
    public show: boolean = false;
    public hidePassword: boolean = true;

    @Output() changeSigntab = new EventEmitter;
    @Output() closeModal = new EventEmitter();
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _authUserService: AuthUserService,
        private _cookieService: CookieService,
        private _profileUserService: UserService,
        private _socialAuthService: AuthService,

    ) {
        this.profileUser = this._profileUserService.user;

    }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.signUpGroup = this._fb.group({
            firstName: [null, Validators.required],
            userName: [null, Validators.required],
            email: [null, Validators.required],
            password: [null, Validators.required],
            coach: [null],
        })
    }

    public onChangeAuthMain(event = this.tab) {
        this.changeSigntab.emit(event);
    }
    public chackIsValid(controlName: string): boolean {
        return this.signUpGroup.get(controlName).hasError('required') && this.signUpGroup.get(controlName).touched;
    }



    private _signUpClient(): void {
        this.loading = true;
        this.signUpGroup.disable();
        let signUpData =
        {
            user: {
                email: this.signUpGroup.value.email,
                password: this.signUpGroup.value.password,
                first_name: this.signUpGroup.value.firstName,
            },
            google_id: null,
            ui_language: "http://192.168.1.115:8000/api/utils/language/3/",
            metric: "http://192.168.1.115:8000/api/utils/metric/1/",
        }
        this._authUserService.signUpClient(signUpData)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.signUpGroup.enable();
                })
            )
            .subscribe((data) => {
                this.changeSigntab.emit(this.tab);
            },
                err => {
                    this.errorMessage = err.error;

                }
            )
    }

    private _signUpCoatch(): void {
        this.loading = true;
        this.signUpGroup.disable();
        let signUpData =
        {
            user: {
                email: this.signUpGroup.value.email,
                password: this.signUpGroup.value.password,
                first_name: this.signUpGroup.value.firstName,
            },
            google_id: null,
            // ui_language:null,
            //metric: null,
        }
        this._authUserService.signUpCoach(signUpData)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.signUpGroup.enable();
                })
            )
            .subscribe((data) => {
                this.changeSigntab.emit(this.tab);
            },
                err => {
                    this.errorMessage = err.error;

                }
            )

    }

    signInWithFB(): void {
        this._socialAuthService.authState.subscribe((user) => {
            // if (this.loggedIn = (user != null)) {
            //     this._profileUserService.user = user;
            //     this._profileUserService.isAuthorized = true;
            //     this.closeModal.emit('true');
            //     this._cookieService.put("fbUser", "true");
            // }

        });
        this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

    }

    signInWithGoogle(): void {
        this._socialAuthService.authState.subscribe((user) => {
            if (this.loggedIn = (user != null)) {
                this._profileUserService.user = user;
                this._profileUserService.isAuthorized = true;
                this.closeModal.emit('true');
                this._cookieService.put("googleUser", "true");
            }
        });
        this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    }





    public onClickSignUp(): void {
        if (this.signUpGroup.value.coach === true) {
            this._signUpCoatch();

        }
        else {
            this._signUpClient();

        }
    }

    public showPasswordValue(): void {
        this.show = true;
        this.hidePassword = false;
    }

    public hide(): void {
        this.show = false;
        this.hidePassword = true;
    }

    public checkIsValid(controlName): boolean {
        return this.signUpGroup.get(controlName).hasError('required') && this.signUpGroup.get(controlName).touched;
    }
}