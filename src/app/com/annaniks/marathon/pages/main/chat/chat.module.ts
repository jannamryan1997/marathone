import { NgModule } from "@angular/core";
import { ChatViewComponent } from './chat.view';
import { ChatRoutingModule } from './chat.routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [ChatViewComponent],
    imports: [ChatRoutingModule, SharedModule]
})
export class ChatModule { }