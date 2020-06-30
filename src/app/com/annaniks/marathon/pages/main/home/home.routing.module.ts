import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeView } from './home.view';

const homeRoutes: Routes = [
    {
        path: "", component: HomeView, children:

            [
                {
                    path: "coach",
                    loadChildren: () => import('./coach/coach.module').then(m => m.CoachModule),
                },
                {
                    path: "client",
                    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
                },
               
            ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }