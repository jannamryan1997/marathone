import { NgModule } from "@angular/core";
import { EditProfileView } from './edit-profile.view';
import { EditProfileRoutingModule } from './edit-profile.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { SharedModule } from '../../../shared/shared.module';
import {MultiSelectModule} from 'primeng/multiselect';

import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SpecialtiesModal } from '../../../core/modals';


@NgModule({
    declarations: [EditProfileView,SpecialtiesModal],
    imports: [
        EditProfileRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        MatChipsModule,
        MatAutocompleteModule,
        MultiSelectModule,
        SharedModule],
    providers:[],
    entryComponents:[SpecialtiesModal]
})

export class EditProfileModule {

}