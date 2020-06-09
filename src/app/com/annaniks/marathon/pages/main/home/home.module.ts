import { NgModule } from "@angular/core";
import { SharedModule } from '../../../shared/shared.module';
import { HomeView } from './home.view';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
    declarations: [HomeView],
    imports: [SharedModule,HomeRoutingModule]
})

export class HomeModule { }