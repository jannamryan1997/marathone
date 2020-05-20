import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CombinationView } from './combination.view';

const combinationRoutes: Routes = [
    { path: "", component: CombinationView }
]

@NgModule({
    imports: [RouterModule.forChild(combinationRoutes)],
    exports: [RouterModule]
})

export class CombinationRoutingModule { }