import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NutritionInformationView } from './nutrition-information.view';

const nutritionInformationRoutes: Routes = [
    { path: "", component: NutritionInformationView }
]

@NgModule({
    imports: [RouterModule.forChild(nutritionInformationRoutes)],
    exports: [RouterModule]
})

export class NutritionInformationRoutingModule { }