import { NgModule } from "@angular/core";
import { SuggestionnsUserListViewComponent } from './suggestions-user-list.view';
import { SharedModule } from '../../../shared/shared.module';
import { SuggestionsUserUListRoutingModule } from './suggestions-user-list.routing.module';

@NgModule({
    declarations: [SuggestionnsUserListViewComponent],
    imports: [SharedModule, SuggestionsUserUListRoutingModule]
})
export class SuggestionsUserListModule { }