import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IngridientRecipeView } from './ingridient-recipe.view';

const ingridientRecipeRoutes: Routes = [
    { path: "", component: IngridientRecipeView }
]

@NgModule({
    imports: [RouterModule.forChild(ingridientRecipeRoutes)],
    exports: [RouterModule]
})

export class IngridientRecipeRoutingModule { }