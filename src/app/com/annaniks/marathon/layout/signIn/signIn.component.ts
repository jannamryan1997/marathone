import { Component, OnInit, Output, EventEmitter} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignInResponse, SignInData } from '../../core/models';
import { finalize } from 'rxjs/operators';
import { AuthUserService } from '../../core/services/auth.services';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../core/services/user.service';
import { SocialUser } from 'angularx-social-login';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthModal } from '../../core/modals';

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
    public profileUser;
    public loggedIn: boolean;
    public show: boolean = false;
    public hidePassword: boolean = true;
    @Output() tabChanges = new EventEmitter();
    @Output() closeModal = new EventEmitter();


    constructor(
        private _fb: FormBuilder,
        private _authUserService: AuthUserService,
        private _cookieService: CookieService,
        private _profileUserService: UserService,
        private _dialogRef: MatDialogRef<AuthModal>,

    ) {
        this.profileUser = this._profileUserService.user;

    }

    ngOnInit() {
        this._formBuilder();

    }

    private _formBuilder(): void {
        this.signInGroup = this._fb.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
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
                this.closeModal.emit('true');
                this._cookieService.put('access', data.access);
                this._cookieService.put('refresh', data.refresh);
                this._cookieService.put('role', data.role);
                this._profileUserService.isAuthorized = true;
                location.reload();
            },
                err => {
                    this.errorMessage ="Invalid username or password";
                }
            )

    }


    public onClickTab(tab): void {
        this.tab = tab;
        this.tabChanges.emit(this.tab);
        if (this.tab === 1) {
            this._signIn();
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
    public chackIsValid(controlName: string): boolean {
        return this.signInGroup.get(controlName).hasError('required') && this.signInGroup.get(controlName).touched;
    }

}