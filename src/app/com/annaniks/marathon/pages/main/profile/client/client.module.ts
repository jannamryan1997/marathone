import { NgModule } from "@angular/core";
import { ClientView } from './client.view';
import { ClientRoutingModule } from './client.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ClientView],
    imports: [ClientRoutingModule,SharedModule,CommonModule,ReactiveFormsModule,FormsModule],
    providers:[]
})

export class ClientModule { }