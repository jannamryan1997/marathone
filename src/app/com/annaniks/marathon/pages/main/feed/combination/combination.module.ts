import { NgModule } from "@angular/core";
import { CombinationView } from './combination.view';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CombinationRoutingModule } from './combination.routing.module';

@NgModule({
    declarations: [CombinationView],
    imports: [SharedModule, CommonModule,CombinationRoutingModule]
})

export class CombinationModule { } 
