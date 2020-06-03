import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInResponse, SignInData } from '../../core/models';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.services';
import { CookieService } from 'ngx-cookie-service';

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
    @Output() closeModal=new EventEmitter();


    constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService,private _cookieService:CookieService) { }

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
        let signInResponse:SignInData =
        {
            username: this.signInGroup.value.email,
            password: this.signInGroup.value.password,
        }
        this._authService.SignIn(signInResponse)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.signInGroup.enable();
                })
            )
            .subscribe((data:SignInResponse) => {
                console.log(data);
                this.closeModal.emit('true');
                this._cookieService.set('access',data.access);
                this._cookieService.set('refresh',data.refresh);

            },
                err => {
                    console.log(err);
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