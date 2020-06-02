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
    SignUpComponent
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
import { AuthService } from '../core/services/auth.services';
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
        MatSelectModule
    ],
    providers: [AuthService],
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
        MatSelectModule

    ]
})

export class SharedModule { }