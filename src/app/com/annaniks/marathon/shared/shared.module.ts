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


import { AuthModal, LikeModal } from '../core/modals';
import { AuthGuard } from '../core/guards/auth.guard';
import { NgxLoadingModule } from 'ngx-loading';

import { FeedPostCardItemComponent } from '../pages/main/feed/feed-posts/component/feed-post-card-item/feed-post-card-item.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import {MatProgressBarModule} from '@angular/material/progress-bar';


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
    ForgotPasswordComponent,
    InformationComponent,
    EducationComponent,
    ExperienceComponent,
    GelleryComponent,
    CreatePublicationComponent,
    ContentImageComponent,
    ContentVideoComponent,
    SpinnerLoadingComponent,
    FullScreenLoaderComponent,
    DeleteFeedItemComponent,
    LiketemComponent,
    ShareComponent,
    UserItemComponent,
    SkeletonLoadingComponent,
    ChatComponent
} from '../layout';
import { FeedService } from '../pages/main/feed/feed.service';
import { CountryService } from '../core/services/country.service';
import { LikeService } from '../core/services/like.service';

import {AutoCompleteModule} from 'primeng/autocomplete';

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
        ForgotPasswordComponent,
        InformationComponent,
        EducationComponent,
        ExperienceComponent,
        GelleryComponent,
        CreatePublicationComponent,
        ContentImageComponent,
        ContentVideoComponent,
        SpinnerLoadingComponent,
        FullScreenLoaderComponent,
        DeleteFeedItemComponent,
        LiketemComponent,
        LikeModal,
        ShareComponent,
        UserItemComponent,
        SkeletonLoadingComponent,
        ChatComponent
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
        NgxLoadingModule,
        InfiniteScrollModule,
        SlickCarouselModule,
        MatProgressBarModule,
        AutoCompleteModule
    ],
    providers: [AuthGuard,FeedService,CountryService,LikeService],
    entryComponents: [LikeModal],
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
        PlyrModule,
        NgxLoadingModule,
        InfiniteScrollModule,
        SlickCarouselModule,
        AutoCompleteModule,
        HeaderComponent,
        LeftMenuCompomemtn,
        RightMenuComponent,
        CommentsComponent,
        SpinnerLoadingComponent,
        SettingsComponent,
        PostsComments,
        FeedPostCardItemComponent,
        LoadingComponent,
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        InformationComponent,
        EducationComponent,
        ExperienceComponent,
        GelleryComponent,
        CreatePublicationComponent,
        ContentImageComponent,
        ContentVideoComponent,
        FullScreenLoaderComponent,
        DeleteFeedItemComponent,
        LikeModal,
        LiketemComponent,
        ShareComponent,
        UserItemComponent,
        MatProgressBarModule,
        SkeletonLoadingComponent,
        ChatComponent
   
    ],
})

export class SharedModule { }
