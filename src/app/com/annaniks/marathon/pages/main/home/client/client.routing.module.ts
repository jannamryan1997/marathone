import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import { ClientView } from './client.view';

const clientRoutes:Routes=[
    {path:"",component:ClientView}
]
@NgModule({
    imports:[RouterModule.forChild(clientRoutes)],
    exports:[RouterModule]
})
export class ClientRoutingModule{}