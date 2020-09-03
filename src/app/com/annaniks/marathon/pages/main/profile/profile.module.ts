import { NgModule } from "@angular/core";
import { SharedModule } from '../../../shared/shared.module';
import { ProfileView } from './profile.view';
import { ProfileRoutingModule } from './profile.routing.module';
import { GalleryModal, ProfileCoverModal } from '../../../core/modals';

@NgModule({
    declarations: [ProfileView,GalleryModal,ProfileCoverModal],
    imports: [SharedModule,ProfileRoutingModule],
    entryComponents:[GalleryModal,ProfileCoverModal]
})

export class ProfileModule { }