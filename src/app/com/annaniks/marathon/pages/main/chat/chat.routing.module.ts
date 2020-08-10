import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ChatViewComponent } from './chat.view';
const chatRoutes: Routes = [{ path: '', component: ChatViewComponent }]
@NgModule({
    imports: [RouterModule.forChild(chatRoutes)],
    exports: [RouterModule]
})
export class ChatRoutingModule { }