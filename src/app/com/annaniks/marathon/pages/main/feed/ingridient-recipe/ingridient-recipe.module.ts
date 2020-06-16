import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IngridientRecipeView } from './ingridient-recipe.view';
import { IngridientRecipeRoutingModule } from './ingridient-recipe.routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [IngridientRecipeView],
    imports: [
        SharedModule, 
        ReactiveFormsModule, 
        FormsModule,
        IngridientRecipeRoutingModule
    ]
})

export class IngridientRecipeModule { }