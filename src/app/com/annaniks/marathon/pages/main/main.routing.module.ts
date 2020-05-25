import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainView } from './main.view';

const mainRoutes: Routes = [
    {
        path: "", component: MainView, children: [
            { path: "", redirectTo: "feed", pathMatch: "full" },
            {
                path: "feed",
                loadChildren: () => import('../main/feed/feed.module').then(m => m.FeedModule),
            },
            {
                path: "home",
                loadChildren: () => import('../main/home/home.module').then(m => m.HomeModule),
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