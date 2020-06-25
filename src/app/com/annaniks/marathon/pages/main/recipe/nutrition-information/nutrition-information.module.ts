import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { NutritionInformationView } from './nutrition-information.view';
import { NutritionInformationRoutingModule } from './nutrition-information.routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [NutritionInformationView],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NutritionInformationRoutingModule]
})

export class NutritionInformationModule { }