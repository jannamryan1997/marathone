import { NgModule } from "@angular/core";
import { HeaderComponent, LeftMenuCompomemtn, RightMenuComponent, CommentsComponent } from '../layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
    declarations: [
        HeaderComponent, 
        LeftMenuCompomemtn, 
        RightMenuComponent, 
        CommentsComponent
    ],
    imports: [
        CommonModule, 
        RouterModule, 
        MatDialogModule, 
        ReactiveFormsModule, 
        FormsModule,
        PickerModule,
        ClickOutsideModule
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
        ClickOutsideModule
        
    ]
})

export class SharedModule { }