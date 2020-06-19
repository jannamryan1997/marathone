import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import {RecipeRoutingModule } from './recipe.routing.module';

import { RecipeView } from './recipe.view';
import { SharedModule } from '../../../shared/shared.module';
import { AddIngridientImageModal } from '../../../core/modals';
import { AddRecipeImageComponent, PreparationStepComponent } from '../../../layout';


@NgModule({
    declarations: [
        RecipeView,
        AddIngridientImageModal,
        AddRecipeImageComponent,
        PreparationStepComponent],
    imports: [
        SharedModule, 
        ReactiveFormsModule, 
        FormsModule,
        CommonModule,
        SlickCarouselModule,
        MatSlideToggleModule,
        RecipeRoutingModule,
  
       
    ],
    entryComponents:[AddIngridientImageModal]
})

export class RecipeModule { }