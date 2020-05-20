import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IngridientViewComponent } from './ingridient.view';


const ingridientRoutes: Routes = [
    { path: "", component: IngridientViewComponent }
]
@NgModule({
    imports: [RouterModule.forChild(ingridientRoutes)],
    exports: [RouterModule]
})
export class IngridientRoutingModule { }