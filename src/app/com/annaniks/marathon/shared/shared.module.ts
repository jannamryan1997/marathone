import {NgModule} from "@angular/core";
import { HeaderComponent, LeftMenuCompomemtn, RightMenuComponent } from '../layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations:[HeaderComponent,LeftMenuCompomemtn,RightMenuComponent],
    imports:[CommonModule,RouterModule],
    providers:[],
    entryComponents:[],
    exports:[HeaderComponent,LeftMenuCompomemtn,RightMenuComponent,CommonModule]
})

export class SharedModule{}