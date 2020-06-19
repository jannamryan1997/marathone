import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedPostsView } from './feed-posts.view';

const postsRoutes: Routes = [
    {
        path: "", component: FeedPostsView, children: [
            
    ]
    },

]
@NgModule({
    imports: [RouterModule.forChild(postsRoutes)],
    exports: [RouterModule]
})

export class FeedPostsRoutingModule { }