import { NgModule } from "@angular/core";
import { RecipePostRoutingModule } from './recipe-post.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatRadioModule} from '@angular/material/radio';

import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';

import { AddRecipeImageComponent, PreparationStepComponent, IngridientItemComponent } from '../../../../layout';
import { AddIngridientImageModal } from '../../../../core/modals';
import { RecipePostView } from './recipe-post.view';


import { SharedModule } from '../../../../shared/shared.module';
import { CarouselComponent } from '../../../../layout/components/carousel/carousel.component';
import { CountryService } from '../../../../core/services/country.service';

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
        MatRadioModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSelectModule
    ],
    entryComponents: [AddIngridientImageModal],
    providers:[CountryService]
})

export class RecipePostModule { }