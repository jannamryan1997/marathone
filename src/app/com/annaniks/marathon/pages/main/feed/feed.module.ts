import { NgModule } from "@angular/core";
import { FeedView } from './feed.view';
import { FeedRoutingModule } from './feed.routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [FeedView],
    imports: [FeedRoutingModule,CommonModule,RouterModule]
})

export class FeedModule { }