import { NgModule } from "@angular/core";
import { SharedModule } from '../../../shared/shared.module';
import { HomeView } from './home.view';
import { HomeRoutingModule } from './home.routing.module';
import { ReviewComponent,GelleryComponent } from '../../../layout';

@NgModule({
    declarations: [HomeView,GelleryComponent,ReviewComponent],
    imports: [SharedModule,HomeRoutingModule]
})

export class HomeModule { }