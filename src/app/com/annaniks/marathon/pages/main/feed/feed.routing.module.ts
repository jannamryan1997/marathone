import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedView } from './feed.view';

const feedRoutes: Routes = [
    { path: "", component: FeedView }
]
@NgModule({
    imports: [RouterModule.forChild(feedRoutes)],
    exports: [RouterModule]
})

export class FeedRoutingModule {

}