import { NgModule } from "@angular/core";

import { ArticeRoutingModule } from './article.routing.module';
import { ArticleView } from './article.view';

@NgModule({
    declarations:[ArticleView],
    imports: [ArticeRoutingModule]
})

export class ArticleModule { }