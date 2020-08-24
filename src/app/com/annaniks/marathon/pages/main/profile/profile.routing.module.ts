import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileView } from './profile.view';

const ProfileRoutes: Routes = [
    {
        path: "", component: ProfileView, children:

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
    imports: [RouterModule.forChild(ProfileRoutes)],
    exports: [RouterModule]
})

export class ProfileRoutingModule { }