import { NgModule } from "@angular/core";

import { ArticeRoutingModule } from './article.routing.module';
import { ArticleView } from './article.view';
import { ArticleService } from './article.service';

@NgModule({
    declarations:[ArticleView],
    imports: [ArticeRoutingModule],
    providers:[ArticleService]
})

export class ArticleModule { }