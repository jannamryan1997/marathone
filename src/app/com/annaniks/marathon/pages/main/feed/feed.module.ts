import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FeedView } from './feed.view';
import { FeedRoutingModule } from './feed.routing.module';
import { FeedService } from './feed.service';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
    declarations: [FeedView],
    imports: [FeedRoutingModule,CommonModule,RouterModule,SharedModule],
    providers:[FeedService]
})

export class FeedModule { }