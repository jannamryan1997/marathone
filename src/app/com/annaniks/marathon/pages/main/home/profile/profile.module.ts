import { NgModule } from "@angular/core";
import { ProfileView } from './profile.view';
import { ProfileRoutingModule } from './profile.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { CountryService } from '../../../../core/services/country.service';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
    declarations: [ProfileView],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutoCompleteModule,SharedModule],
    providers:[CountryService]
})

export class ProfileModule {

}