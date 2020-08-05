import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthUserService } from '../../core/services/auth.services';
import { SocialUser} from 'angularx-social-login';
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
        private _authUserService: AuthUserService,
        private _profileUserService: UserService,

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
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            password: [null, Validators.required],
            coach: [null],
            slug:[null,Validators.required]
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
                last_name: '',
                user_name: this.signUpGroup.value.userName,
          
            },
            google_id: null,
            ui_language: "http://192.168.1.115:8000/api/utils/language/3/",
            metric: "http://192.168.1.115:8000/api/utils/metric/1/",
            slug:this.signUpGroup.value.slug,
           // is_faworit:true,
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
                    this.errorMessage ="Fields were filled in incorrectly";

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
                user_name: this.signUpGroup.value.userName,
                last_name: '',
              
            },
            google_id: null,
            // ui_language:null,
            //metric: null,
            slug:this.signUpGroup.value.slug,
           // is_faworit:true,
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