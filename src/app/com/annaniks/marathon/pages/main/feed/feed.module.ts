import { NgModule } from "@angular/core";
import { FeedView } from './feed.view';
import { FeedRoutingModule } from './feed.routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedService } from './feed.service';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [FeedView],
    imports: [FeedRoutingModule,CommonModule,RouterModule,SharedModule],
    providers:[FeedService]
})

export class FeedModule { }