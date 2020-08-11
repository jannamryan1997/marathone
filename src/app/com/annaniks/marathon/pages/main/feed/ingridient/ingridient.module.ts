import { NgModule } from "@angular/core";
import { SharedModule } from '../../../../shared/shared.module';
import { IngridientRoutingModule } from './ingridient.routing.module';
import { IngridientViewComponent } from './ingridient.view';
import { IngridientService } from './ingridient.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    declarations: [IngridientViewComponent],
    imports: [IngridientRoutingModule, SharedModule,SlickCarouselModule,NgxSkeletonLoaderModule],
    providers:[IngridientService]
})

export class IngridientModule { }