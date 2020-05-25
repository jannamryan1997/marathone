import { NgModule } from "@angular/core";
import {
    HeaderComponent,
    LeftMenuCompomemtn,
    RightMenuComponent,
    CommentsComponent,
    SettingsComponent,
    PostsComments
} from '../layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { PostCardItemComponent } from '../pages/main/feed/posts/component/post-card-item/post-card-item.component';

@NgModule({
    declarations: [
        HeaderComponent,
        LeftMenuCompomemtn,
        RightMenuComponent,
        CommentsComponent,
        SettingsComponent,
        PostsComments,
        PostCardItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        PickerModule,
        ClickOutsideModule,
        HttpClientModule
    ],
    providers: [],
    entryComponents: [],
    exports: [
        HeaderComponent,
        LeftMenuCompomemtn,
        RightMenuComponent,
        CommonModule,
        MatDialogModule,
        CommentsComponent,
        ReactiveFormsModule,
        FormsModule,
        PickerModule,
        ClickOutsideModule,
        SettingsComponent,
        PostsComments,
        HttpClientModule,
        PostCardItemComponent

    ]
})

export class SharedModule { }