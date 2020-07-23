import { NgModule } from "@angular/core";

import { ArticeRoutingModule } from './article.routing.module';
import { ArticleView } from './article.view';
import { ArticleService } from './article.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations:[ArticleView],
    imports: [ArticeRoutingModule,DragDropModule],
    providers:[ArticleService]
})

export class ArticleModule { }