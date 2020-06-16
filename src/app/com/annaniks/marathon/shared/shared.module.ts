import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClickOutsideModule } from 'ng-click-outside';

import { AuthModal } from '../core/modals';
import { AuthGuard } from '../core/guards/auth.guard';
import { PostCardItemComponent } from '../pages/main/feed/posts/component/post-card-item/post-card-item.component';



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
        PostCardItemComponent,
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
    ],
    providers: [AuthGuard],
    entryComponents: [],

    exports: [
        ReactiveFormsModule,
        FormsModule,
        PickerModule,
        RouterModule,
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
        PostCardItemComponent,
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
    ]
})

export class SharedModule { }
