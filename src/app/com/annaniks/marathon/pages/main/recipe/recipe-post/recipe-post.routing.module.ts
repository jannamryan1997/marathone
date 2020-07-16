import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipePostView } from './recipe-post.view';

const recipepostRoutes: Routes = [
    { path: "", component: RecipePostView }
]

@NgModule({
    imports: [RouterModule.forChild(recipepostRoutes)],
    exports: [RouterModule]
})

export class RecipePostRoutingModule { }