 import { NgModule } from "@angular/core";
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
} from '../layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { PostCardItemComponent } from '../pages/main/feed/posts/component/post-card-item/post-card-item.component';
import {AuthModal } from '../core/modals';
import {MatSelectModule} from '@angular/material/select';
import { AuthGuard } from '../core/guards/auth.guard';
import {MatFormFieldModule} from '@angular/material/form-field';
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
        CreatePublicationComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        PickerModule,
        ClickOutsideModule,
        HttpClientModule,
        MatSelectModule,
        MatFormFieldModule
    ],
    providers: [AuthGuard],
    entryComponents: [],
    exports: [
        HeaderComponent,
        LeftMenuCompomemtn,
        RightMenuComponent,
        CommonModule,
        RouterModule,
        MatDialogModule,
        CommentsComponent,
        ReactiveFormsModule,
        FormsModule,
        PickerModule,
        ClickOutsideModule,
        SettingsComponent,
        PostsComments,
        HttpClientModule,
        PostCardItemComponent,
        LoadingComponent,
        AuthModal,
        SignInComponent,
        SignUpComponent,
        MatSelectModule,
        InformationComponent,
        EducationComponent,
        ExperienceComponent,
        GelleryComponent,
        MatFormFieldModule,
        CreatePublicationComponent
    ]
})

export class SharedModule { }