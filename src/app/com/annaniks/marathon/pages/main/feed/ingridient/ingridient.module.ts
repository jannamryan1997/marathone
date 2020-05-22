import { NgModule } from "@angular/core";
import { SharedModule } from '../../../../shared/shared.module';
import { IngridientRoutingModule } from './ingridient.routing.module';
import { IngridientViewComponent } from './ingridient.view';
import { IngridientService } from './ingridient.service';

@NgModule({
    declarations: [IngridientViewComponent],
    imports: [IngridientRoutingModule, SharedModule],
    providers:[IngridientService]
})

export class IngridientModule { }