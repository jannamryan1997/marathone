import { NgModule } from "@angular/core";
import { EditProfileView } from './edit-profile.view';
import { EditProfileRoutingModule } from './edit-profile.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import {MultiSelectModule} from 'primeng/multiselect';

import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SpecialtiesModal } from '../../../core/modals';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
    declarations: [EditProfileView,SpecialtiesModal],
    imports: [
        EditProfileRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatAutocompleteModule,
        MultiSelectModule,
        GooglePlaceModule,
        SharedModule],
    providers:[],
    entryComponents:[SpecialtiesModal]
})

export class EditProfileModule {

}