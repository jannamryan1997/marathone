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
                //  canActivate: [RoleGuard]

            },
            {
                path: "profile",
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
                canActivate: [RoleGuard]
            },
            {
                path: "edit-profile",
                loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule),
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
          

        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule {

}