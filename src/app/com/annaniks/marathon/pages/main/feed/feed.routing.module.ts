import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedView } from './feed.view';

const feedRoutes: Routes = [
    {
        path: "", component: FeedView, children: [
            {
                path: "",
                loadChildren: () => import('../feed/posts/posts.module').then(m => m.PostsModule),
            },
            {
                path: "ingridient/:id",
                loadChildren: () => import('../feed/ingridient/ingridient.module').then(m => m.IngridientModule),

            },
            {
                path: "combination/:id",
                loadChildren: () => import('../feed/combination/combination.module').then(m => m.CombinationModule),
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(feedRoutes)],
    exports: [RouterModule]
})

export class FeedRoutingModule {

}