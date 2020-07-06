import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditProfileView } from './edit-profile.view';

const editprofileRoutes: Routes = [
    { path: "", component: EditProfileView }
]

@NgModule({
    imports: [RouterModule.forChild(editprofileRoutes)],
    exports: [RouterModule]
})

export class EditProfileRoutingModule { }