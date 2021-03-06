import { NgModule } from "@angular/core";
import { FeedPostsView } from './feed-posts.view';
import { FeedPostsRoutingModule } from './feed-posts.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PropertyModal, RemoveModal } from '../../../../core/modals';
import { FeedPostsService } from './feed-posts.service';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
    declarations: [FeedPostsView,PropertyModal],
    imports: [FeedPostsRoutingModule,SharedModule,CommonModule,NgxSkeletonLoaderModule],
    entryComponents:[PropertyModal,RemoveModal],
    providers:[FeedPostsService]
})

export class FeedPostsModule { }