import { NgModule } from "@angular/core";
import { FeedPostsView } from './feed-posts.view';
import { FeedPostsRoutingModule } from './feed-posts.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PropertyModal } from '../../../../core/modals';
import { FeedPostsService } from './feed-posts.service';

@NgModule({
    declarations: [FeedPostsView,PropertyModal],
    imports: [FeedPostsRoutingModule,SharedModule,CommonModule],
    entryComponents:[PropertyModal],
    providers:[FeedPostsService]
})

export class FeedPostsModule { }