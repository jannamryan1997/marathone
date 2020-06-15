import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PablishView } from './publish.view';

const publishRoutes:Routes=[
    {path:"",component:PablishView}
]

@NgModule({
    imports: [RouterModule.forChild(publishRoutes)],
    exports: [RouterModule]
})

export class PublishRoutingModule {

}