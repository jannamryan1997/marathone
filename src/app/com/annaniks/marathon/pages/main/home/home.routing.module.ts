import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeView } from './home.view';

const homeRoutes: Routes = [
    {
        path: "", component: HomeView, children:

            [
                { path: "", pathMatch: "full", redirectTo: "coach" },
                {
                    path: "coach",
                    loadChildren: () => import('./coach/coach.module').then(m => m.CoachModule),
                },
                {
                    path: "client",
                    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
                },
                {
                    path: "profile",
                    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
                },
            ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }