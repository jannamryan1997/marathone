import { NgModule } from "@angular/core";
import { ChatViewComponent } from './chat.view';
import { ChatRoutingModule } from './chat.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [ChatViewComponent],
    imports: [ChatRoutingModule, SharedModule, FontAwesomeModule],
    providers: []
})
export class ChatModule { }