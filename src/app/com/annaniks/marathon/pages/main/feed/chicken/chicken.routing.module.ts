import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChickenViewComponent } from './chicken.view';


const chickenRoutes: Routes = [
    { path: "", component: ChickenViewComponent }
]
@NgModule({
    imports: [RouterModule.forChild(chickenRoutes)],
    exports: [RouterModule]
})
export class ChickenRoutingModule { }