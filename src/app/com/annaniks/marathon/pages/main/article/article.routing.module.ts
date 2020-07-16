import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { ArticleView } from "./article.view";

const articleRoutes: Routes = [
    // { path: "", pathMatch: "full", redirectTo: "publish" },
    {
        path: "", component: ArticleView
        // , children: [
        //     {
        //         path: "publish",
        //         loadChildren: () => import('./publish/publish.module').then(m => m.PublishModule)
        //     },
        //     {
        //         path: "update",
        //         loadChildren: () => import('./update/update.module').then(m => m.UpdateModule)
        //     }
        // ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(articleRoutes)],

    exports: [
        RouterModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})

export class ArticeRoutingModule {

}