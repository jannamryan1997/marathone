import { NgModule } from "@angular/core";
import { RegistrationView } from './registration.view';
import { RegistrationRoutingModule } from './registration.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { OnlyNumberDirective } from '../../../core/directive';

@NgModule({
    declarations: [RegistrationView,OnlyNumberDirective],
    imports: [RegistrationRoutingModule,FormsModule,ReactiveFormsModule,CommonModule,SharedModule]
})

export class RgistrationModule { }