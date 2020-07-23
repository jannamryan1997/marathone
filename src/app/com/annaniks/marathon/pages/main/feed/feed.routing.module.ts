import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedView } from './feed.view';
import { RoleGuard } from '../../../core/guards/role.guard';

const feedRoutes: Routes = [
    {
        path: "", component: FeedView, children: [
            {
                path: "",
                loadChildren: () => import('./feed-posts/feed-posts.module').then(m => m.FeedPostsModule),
            },
            {
                path: "ingridient/:id",
                loadChildren: () => import('./ingridient/ingridient.module').then(m => m.IngridientModule),

            },
            {
                path: "combination/:id",
                loadChildren: () => import('./combination/combination.module').then(m => m.CombinationModule),
            },
            // {
            //     path: "post-recipe",
            //     loadChildren: () => import('./post-recipe/post-recipe.module').then(m => m.PostRecipeModule),
            // },
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(feedRoutes)],
    exports: [RouterModule]
})

export class FeedRoutingModule {

}