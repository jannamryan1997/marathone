import { NgModule } from "@angular/core";
import { ChatViewComponent } from './chat.view';
import { ChatRoutingModule } from './chat.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatService } from './chat.service';

@NgModule({
    declarations: [ChatViewComponent],
    imports: [ChatRoutingModule, SharedModule, FontAwesomeModule,
    ],
    providers: [ChatService]
})
export class ChatModule { }