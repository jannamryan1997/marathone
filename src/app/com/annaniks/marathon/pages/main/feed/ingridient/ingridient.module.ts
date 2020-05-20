import { NgModule } from "@angular/core";
import { SharedModule } from '../../../../shared/shared.module';
import { IngridientRoutingModule } from './ingridient.routing.module';
import { IngridientViewComponent } from './ingridient.view';

@NgModule({
    declarations: [IngridientViewComponent],
    imports: [IngridientRoutingModule, SharedModule]
})

export class IngridientModule { }