import { NgModule } from "@angular/core";
import { SharedModule } from '../../../shared/shared.module';
import { ProfileView } from './profile.view';
import { ProfileRoutingModule } from './profile.routing.module';
import { GalleryModal, ProfileCoverModal } from '../../../core/modals';
import { Md5 } from 'ts-md5/dist/md5';

@NgModule({
    declarations: [ProfileView,GalleryModal,ProfileCoverModal],
    imports: [SharedModule,ProfileRoutingModule],
    entryComponents:[GalleryModal,ProfileCoverModal],
    providers:[Md5]
})

export class ProfileModule { }