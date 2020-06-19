import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeView } from './recipe.view';

const RecipeRoutes: Routes = [
    { path: "", component: RecipeView }
]

@NgModule({
    imports: [RouterModule.forChild(RecipeRoutes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule { }