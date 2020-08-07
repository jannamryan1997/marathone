import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SuggestionnsUserListViewComponent } from './suggestions-user-list.view';
let userListRoutes: Routes = [{ path: '', component: SuggestionnsUserListViewComponent }]
@NgModule({
    imports: [RouterModule.forChild(userListRoutes)],
    exports: [RouterModule]
})
export class SuggestionsUserUListRoutingModule { }