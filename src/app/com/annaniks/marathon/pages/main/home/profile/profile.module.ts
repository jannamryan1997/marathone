import { NgModule } from "@angular/core";
import { ProfileView } from './profile.view';
import { ProfileRoutingModule } from './profile.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProfileView],
    imports: [ProfileRoutingModule,CommonModule,FormsModule,ReactiveFormsModule]
})

export class ProfileModule {

}