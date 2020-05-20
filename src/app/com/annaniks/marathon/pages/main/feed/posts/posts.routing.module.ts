import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsView } from './posts.view';

const postsRoutes: Routes = [
    {
        path: "", component: PostsView, children: [
    ]
    },

]
@NgModule({
    imports: [RouterModule.forChild(postsRoutes)],
    exports: [RouterModule]
})

export class PostsRoutingModule { }