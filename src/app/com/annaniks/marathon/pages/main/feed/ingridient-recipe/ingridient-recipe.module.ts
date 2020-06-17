import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { IngridientRecipeView } from './ingridient-recipe.view';
import { AddIngridientImageModal } from '../../../../core/modals';

import { IngridientRecipeRoutingModule } from './ingridient-recipe.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AddIngridientImageComponent, PreparationStepComponent } from '../../../../layout';


@NgModule({
    declarations: [IngridientRecipeView,AddIngridientImageModal,AddIngridientImageComponent,PreparationStepComponent],
    imports: [
        SharedModule, 
        ReactiveFormsModule, 
        FormsModule,
        CommonModule,
        SlickCarouselModule,
        MatSlideToggleModule,
        IngridientRecipeRoutingModule,
  
       
    ],
    entryComponents:[AddIngridientImageModal]
})

export class IngridientRecipeModule { }