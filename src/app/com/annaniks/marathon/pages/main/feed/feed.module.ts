import { NgModule } from "@angular/core";
import { FeedView } from './feed.view';
import { FeedRoutingModule } from './feed.routing.module';
import { FeedItemComponent } from './component/feed-item/feed-item.component';
import { StatusCardItemComponent } from './status-card-item/status-card-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [FeedView,FeedItemComponent,StatusCardItemComponent],
    imports: [FeedRoutingModule,CommonModule]
})

export class FeedModule { }