import { NgModule } from "@angular/core";
import { SharedModule } from '../../../shared/shared.module';
import { ProfileView } from './profile.view';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
    declarations: [ProfileView],
    imports: [SharedModule,ProfileRoutingModule]
})

export class ProfileModule { }