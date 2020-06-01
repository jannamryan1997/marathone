import { NgModule } from "@angular/core";
import { AuthView } from './auth.view';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth.routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthView],
    imports: [AuthRoutingModule,CommonModule,ReactiveFormsModule,FormsModule],
    providers:[AuthService]
})

export class AuthModule {

}