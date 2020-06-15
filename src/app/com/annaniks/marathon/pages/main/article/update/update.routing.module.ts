import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateView } from './update.view';

const updateRoutes: Routes = [
    { path: "", component: UpdateView }
]
@NgModule({
    imports: [RouterModule.forChild(updateRoutes)],
    exports: [RouterModule]
})

export class UpdateRoutingModule { }