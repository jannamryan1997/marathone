import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoachView } from './coach.view';

const coachRoutes: Routes = [
    { path: "", component: CoachView }
]

@NgModule({
    imports: [RouterModule.forChild(coachRoutes)],
    exports: [RouterModule]
})

export class CoachRoutingModule { }