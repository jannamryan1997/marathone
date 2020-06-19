import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostRecipeView } from "./post-recipe.view";

const recipeRoutes: Routes = [
    { path: "", component: PostRecipeView }
]
@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})

export class PostRecipeRoutingModule {

}