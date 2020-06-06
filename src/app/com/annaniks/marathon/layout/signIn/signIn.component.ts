import { Component, OnInit, Output, EventEmitter} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInResponse, SignInData } from '../../core/models';
import { finalize } from 'rxjs/operators';
import { AuthUserService } from '../../core/services/auth.services';
import { CookieService } from 'ngx-cookie-service';
import { ProfileUserService } from '../../core/services/user.service';
import { SocialUser} from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from "angularx-social-login";

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
    public user: SocialUser;
    public loggedIn: boolean;
    @Output() tabChanges = new EventEmitter();
    @Output() closeModal = new EventEmitter();


    constructor(
        private _fb: FormBuilder,
        private _authUserService: AuthUserService,
        private _cookieService: CookieService,
        private _profileUserService: ProfileUserService,
        private _socialAuthService: AuthService,
     
    ) { 

        
    }

    ngOnInit() {
        this._formBuilder();
     
    }

    private _formBuilder(): void {
        this.signInGroup = this._fb.group({
            email: ["wogipa4708@tashjw.com", Validators.required],
            password: ["wogipa4708", Validators.required]
        })
    }
    private _signIn(): void {
        this.loading = true;
        this.signInGroup.disable();
        let signInResponse: SignInData =
        {
            username: this.signInGroup.value.email,
            password: this.signInGroup.value.password,
        }
        this._authUserService.SignIn(signInResponse)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.signInGroup.enable();
                })
            )
            .subscribe((data: SignInResponse) => {
                console.log(data);
                this.closeModal.emit('true');
                this._cookieService.set('access', data.access);
                this._cookieService.set('refresh', data.refresh);
                this._profileUserService.isAuthorized = true;
                this._profileUserService.user = {
                    name: "Maya Crouche",
                    email: "@mayacrouch",
                    photoUrl: "assets/images/img2.png"
                };
                console.log(this._profileUserService.isAuthorized);

            },
                err => {
                    console.log(err);
                    this.errorMessage = err.error;
                }
            )

    }

    public getUser(): void {
        // this._profileUserService.getUser()
        //     .subscribe((data) => {
        //         this._userService.user = data;
        //         this._userService.isAuthorized = true;
        //     })
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
    signInWithFB(): void {
        this._socialAuthService.authState.subscribe((user) => {
            if(this.loggedIn = (user != null)){
                this._profileUserService.user = user;
                this._profileUserService.isAuthorized = true;
                this.closeModal.emit('true');
                this._cookieService.set("fbUser","true");
            }
            console.log(this.loggedIn,"this.loggedInkkkkkkk");
            
         

        });
        this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

    }

    signInWithGoogle(): void {
        this._socialAuthService.authState.subscribe((user) => {
            if(this.loggedIn = (user != null)){
                this._profileUserService.user = user;
                this._profileUserService.isAuthorized = true;
                this.closeModal.emit('true');
                this._cookieService.set("googleUser","true");
            }
            console.log(this.loggedIn,"this.loggedInkkkkkkk");
            
         

        });
        this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    }



    // signOut(): void {
    //     this._socialAuthService.signOut();
    // }

}