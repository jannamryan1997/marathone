import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {RecipeRoutingModule } from './recipe.routing.module';

import { RecipeView } from './recipe.view';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
    declarations: [
        RecipeView,
    ],

    imports: [
        SharedModule, 
        ReactiveFormsModule, 
        FormsModule,
        CommonModule,
        RecipeRoutingModule,     
    ],
    entryComponents:[]
})

export class RecipeModule { }