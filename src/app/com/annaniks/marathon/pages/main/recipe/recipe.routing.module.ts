import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeView } from './recipe.view';

const RecipeRoutes: Routes = [
    {
        path: "", component: RecipeView, children: [
            { path: "", pathMatch: 'full', redirectTo: 'recipe-post' },
            {
                path: "recipe-post",
                loadChildren: () => import('./recipe-post/recipe-post.module').then(m => m.RecipePostModule),
            },
            {
                path: "recipe-post/:id",
                loadChildren: () => import('./recipe-post/recipe-post.module').then(m => m.RecipePostModule),
            },
            {
                path: "information",
                loadChildren: () => import('./nutrition-information/nutrition-information.module').then(m => m.NutritionInformationModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(RecipeRoutes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule { }