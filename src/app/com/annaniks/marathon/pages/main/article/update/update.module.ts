import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared/shared.module';
import { UpdateView } from './update.view';
import { UpdateRoutingModule } from './update.routing.module';


@NgModule({
    declarations: [UpdateView],
    imports: [
        SharedModule,
        UpdateRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})

export class UpdateModule { }