import { NgModule } from "@angular/core";
import { MainRoutingModule } from './main.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MainView } from './main.view';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [MainView],
    imports: [MainRoutingModule, SharedModule, CommonModule]
})

export class MainModule { }