import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeView } from "./recipe.view";

const recipeRoutes: Routes = [
    { path: "", component: RecipeView }
]
@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {

}