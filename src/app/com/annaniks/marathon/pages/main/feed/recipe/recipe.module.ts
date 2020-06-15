import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipeView } from './recipe.view';
import { RecipeItemComponent } from './components';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe.routing.module';
import { SharedModule } from '../../../../shared/shared.module';




@NgModule({
    declarations: [RecipeView,RecipeItemComponent],
    imports: [
        SharedModule,
        RecipeRoutingModule,   
        FormsModule,
        ReactiveFormsModule,
        CommonModule
        ]
})

export class RecipeModule {

}