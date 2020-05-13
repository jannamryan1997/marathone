import { NgModule } from "@angular/core";
import { FeedView } from './feed.view';
import { FeedRoutingModule } from './feed.routing.module';
import { FeedItemComponent } from './component/feed-item/feed-item.component';

@NgModule({
    declarations: [FeedView,FeedItemComponent],
    imports: [FeedRoutingModule]
})

export class FeedModule { }