import { NgModule } from "@angular/core";
import { LoginView } from './login.view';
import { LoginRoutingModule } from './login.routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [LoginView],
    imports: [
        LoginRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule]
})

export class LoginModule { }