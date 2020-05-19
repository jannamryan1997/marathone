import { NgModule } from "@angular/core";
import { FeedView } from './feed.view';
import { FeedRoutingModule } from './feed.routing.module';
import { CommonModule } from '@angular/common';
import { StatusCardItemComponent } from './component/status-card-item/status-card-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [FeedView,StatusCardItemComponent],
    imports: [FeedRoutingModule,CommonModule,RouterModule]
})

export class FeedModule { }