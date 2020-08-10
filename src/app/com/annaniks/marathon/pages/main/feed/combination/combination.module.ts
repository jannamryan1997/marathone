import { NgModule } from "@angular/core";
import { CombinationView } from './combination.view';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CombinationRoutingModule } from './combination.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CombinationService } from './combination.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
    declarations: [CombinationView],
    imports: [SharedModule, CommonModule,CombinationRoutingModule,ReactiveFormsModule,FormsModule,NgxSkeletonLoaderModule],
    providers:[CombinationService]
})

export class CombinationModule { } 
