import {NgModule} from "@angular/core";

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared/shared.module';
import { PablishView } from './publish.view';
import { PublishRoutingModule } from './publish.routing.module';


@NgModule({
    declarations:[PablishView],
    imports:[
        PublishRoutingModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})

export class PublishModule{
    
}