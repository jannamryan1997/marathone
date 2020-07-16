import { NgModule } from "@angular/core";
import { EditProfileView } from './edit-profile.view';
import { EditProfileRoutingModule } from './edit-profile.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { CountryService } from '../../../core/services/country.service';
import { SharedModule } from '../../../shared/shared.module';


import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
@NgModule({
    declarations: [EditProfileView],
    imports: [
        EditProfileRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        MatChipsModule,
        MatAutocompleteModule,
        SharedModule],
    providers:[CountryService]
})

export class EditProfileModule {

}