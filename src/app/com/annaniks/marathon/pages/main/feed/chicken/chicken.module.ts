import { NgModule } from "@angular/core";
import { ChickenViewComponent } from './chicken.view';
import { ChickenRoutingModule } from './chicken.routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [ChickenViewComponent],
    imports: [ChickenRoutingModule,SharedModule]
})

export class ChickenModule { }