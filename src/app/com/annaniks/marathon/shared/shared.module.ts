import {NgModule} from "@angular/core";
import { HeaderComponent, LeftMenuCompomemtn, RightMenuComponent } from '../layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations:[HeaderComponent,LeftMenuCompomemtn,RightMenuComponent],
    imports:[CommonModule,RouterModule,MatDialogModule],
    providers:[],
    entryComponents:[],
    exports:[HeaderComponent,LeftMenuCompomemtn,RightMenuComponent,CommonModule,MatDialogModule]
})

export class SharedModule{}