import { NgModule } from "@angular/core";
import { PostsView } from './posts.view';
import { PostsRoutingModule } from './posts.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PostCardItemComponent } from './component/post-card-item/post-card-item.component';
import { PropertyModal } from '../../../../core/modals';

@NgModule({
    declarations: [PostsView,PostCardItemComponent,PropertyModal],
    imports: [PostsRoutingModule,SharedModule,CommonModule],
    entryComponents:[PropertyModal]
})

export class PostsModule { }