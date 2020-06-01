import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthView } from './auth.view';

const authRoutes: Routes = [
    {
        path: "", component: AuthView, children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            {
                path: "login",
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
            },
            {
                path: "registration",
                loadChildren: () => import('./registration/registration.module').then(m => m.RgistrationModule),
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }