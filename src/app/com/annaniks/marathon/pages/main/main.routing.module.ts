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
                path: "profile/:id",
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
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
                path: "article/:id",
                loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
            },
            {
                path: "combination/:id",
                loadChildren: () => import('./feed/combination/combination.module').then(m => m.CombinationModule),
            },
            {
                path: "recipe",
                loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)
            },
            {
                path: 'suggestions',
                loadChildren: () => import('./suggestions-user-list/suggestions-user-list.module').then(m => m.SuggestionsUserListModule)
            },
            // {
            //     path: 'chat',
            //     loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
            //     canActivate: [RoleGuard]
            // }


        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule {

}