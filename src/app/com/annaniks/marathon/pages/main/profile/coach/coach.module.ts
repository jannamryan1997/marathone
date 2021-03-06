import { NgModule } from "@angular/core";
import { CoachView } from './coach.view';
import { SharedModule } from '../../../../shared/shared.module';
import { CoachRoutingModule } from './coach.routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent} from '../../../../layout';

@NgModule({
    declarations: [CoachView,ReviewComponent],
    imports: [SharedModule,CoachRoutingModule,CommonModule,ReactiveFormsModule]
})

export class CoachModule {

}