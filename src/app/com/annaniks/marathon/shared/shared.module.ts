import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from 'ng2-ckeditor';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClickOutsideModule } from 'ng-click-outside';
import { PlyrModule } from 'ngx-plyr';

import { AuthModal } from '../core/modals';
import { AuthGuard } from '../core/guards/auth.guard';


import { FeedPostCardItemComponent } from '../pages/main/feed/feed-posts/component/feed-post-card-item/feed-post-card-item.component';


import {
    HeaderComponent,
    LeftMenuCompomemtn,
    RightMenuComponent,
    CommentsComponent,
    SettingsComponent,
    PostsComments,
    LoadingComponent,
    SignInComponent,
    SignUpComponent,
    InformationComponent,
    EducationComponent,
    ExperienceComponent,
    GelleryComponent,
    CreatePublicationComponent,
    ContentImageComponent,
    ContentVideoComponent,
    IngridientItemComponent
} from '../layout';


@NgModule({
    declarations: [
        HeaderComponent,
        LeftMenuCompomemtn,
        RightMenuComponent,
        CommentsComponent,
        SettingsComponent,
        PostsComments,
        FeedPostCardItemComponent,
        LoadingComponent,
        AuthModal,
        SignInComponent,
        SignUpComponent,
        InformationComponent,
        EducationComponent,
        ExperienceComponent,
        GelleryComponent,
        CreatePublicationComponent,
        ContentImageComponent,
        ContentVideoComponent,
        IngridientItemComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterModule,
        MatDialogModule,
        PickerModule,
        ClickOutsideModule,
        HttpClientModule,
        MatSelectModule,
        MatFormFieldModule,
        CKEditorModule,
        PlyrModule,
    ],
    providers: [AuthGuard],
    entryComponents: [],

    exports: [
        ReactiveFormsModule,
        FormsModule,
        PickerModule,
        RouterModule,
        CKEditorModule,
        MatDialogModule,
        CommonModule,
        MatFormFieldModule,
        ClickOutsideModule,
        AuthModal,
        MatSelectModule,
        HttpClientModule,
        HeaderComponent,
        LeftMenuCompomemtn,
        RightMenuComponent,
        CommentsComponent,
        SettingsComponent,
        PostsComments,
        FeedPostCardItemComponent,
        LoadingComponent,
        SignInComponent,
        SignUpComponent,
        InformationComponent,
        EducationComponent,
        ExperienceComponent,
        GelleryComponent,
        CreatePublicationComponent,
        ContentImageComponent,
        ContentVideoComponent,
        IngridientItemComponent,
        PlyrModule
    ]
})

export class SharedModule { }
