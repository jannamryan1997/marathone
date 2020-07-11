import { NgModule } from "@angular/core";
import { RecipePostRoutingModule } from './recipe-post.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatRadioModule} from '@angular/material/radio';

import { AddRecipeImageComponent, PreparationStepComponent, IngridientItemComponent } from '../../../../layout';
import { AddIngridientImageModal } from '../../../../core/modals';
import { RecipePostView } from './recipe.post.view';


import { SharedModule } from '../../../../shared/shared.module';
import { CarouselComponent } from '../../../../layout/components/carousel/carousel.component';

@NgModule({
    declarations: [
        RecipePostView,
        AddRecipeImageComponent,
        PreparationStepComponent,
        AddIngridientImageModal,
        IngridientItemComponent,
        CarouselComponent
    ],
    imports: [
        RecipePostRoutingModule,
        CommonModule,
        FormsModule,
        SlickCarouselModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        SharedModule,
        MatRadioModule
    ],
    entryComponents: [AddIngridientImageModal]
})

export class RecipePostModule { }