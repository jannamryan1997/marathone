import { NgModule } from "@angular/core";
import { UserView } from './user.view';
import { UserRoutingModule } from './user.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [UserView],
    imports: [UserRoutingModule,SharedModule,CommonModule,ReactiveFormsModule,FormsModule]
})

export class UserModule { }