import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import { UserView } from './user.view';

const userRoutes:Routes=[
    {path:"",component:UserView}
]
@NgModule({
    imports:[RouterModule.forChild(userRoutes)],
    exports:[RouterModule]
})
export class UserRoutingModule{}