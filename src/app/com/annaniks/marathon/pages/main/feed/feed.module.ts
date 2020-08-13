import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FeedView } from './feed.view';
import { FeedRoutingModule } from './feed.routing.module';

import { SharedModule } from '../../../shared/shared.module';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    declarations: [FeedView],
    imports: [FeedRoutingModule,CommonModule,RouterModule,SharedModule,NgxSkeletonLoaderModule],
})

export class FeedModule { }