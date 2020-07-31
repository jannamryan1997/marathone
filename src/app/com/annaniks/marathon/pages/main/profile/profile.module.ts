import { NgModule } from "@angular/core";
import { SharedModule } from '../../../shared/shared.module';
import { ProfileView } from './profile.view';
import { ProfileRoutingModule } from './profile.routing.module';
import { GalleryModal } from '../../../core/modals';

@NgModule({
    declarations: [ProfileView,GalleryModal],
    imports: [SharedModule,ProfileRoutingModule],
    entryComponents:[GalleryModal]
})

export class ProfileModule { }