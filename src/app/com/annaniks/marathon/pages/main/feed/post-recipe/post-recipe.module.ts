import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostRecipeView } from './post-recipe.view';
import { PostRecipeItemComponent } from './components';
import { CommonModule } from '@angular/common';

import { PostRecipeRoutingModule } from './post-recipe.routing.module';
import { SharedModule } from '../../../../shared/shared.module';



@NgModule({
    declarations: [
        PostRecipeView,
        PostRecipeItemComponent,
    ],
    imports: [
        SharedModule,
        PostRecipeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    entryComponents: []
})

export class PostRecipeModule {

}