import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileView } from './profile.view';
import { RoleGuard } from '../../../core/guards/role.guard';

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
                {
                    path: "edit-profile",
                    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule),
                    canActivate: [RoleGuard]
                },
            ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(ProfileRoutes)],
    exports: [RouterModule]
})

export class ProfileRoutingModule { }