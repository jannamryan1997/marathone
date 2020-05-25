import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeView } from './home.view';

const homeRoutes: Routes = [
    { path: "", component: HomeView }
]

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }