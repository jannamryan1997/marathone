import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainView } from './main.view';
import { RoleGuard } from '../../core/guards/role.guard';

const mainRoutes: Routes = [
    {
        path: "", component: MainView, children: [
            { path: "", redirectTo: "feed", pathMatch: "full" },
            {
                path: "feed",
                loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule),
            },
            {
                path: "home",
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
                canActivate: [RoleGuard]
            },
            {
                path: "article",
                loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
            },
            {
                path: "recipe",
                loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)
            },
            {
                path: "information",
                loadChildren: () => import('./nutrition-information/nutrition-information.module').then(m => m.NutritionInformationModule)
            }

        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule {

}