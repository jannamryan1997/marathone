import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { UserService } from '../../../core/services/user.service';
import { CertificateData } from '../../../core/models/certificates';
import { UserResponseData } from '../../../core/models/user';

@Component({
    selector: "app-information",
    templateUrl: "information.component.html",
    styleUrls: ["information.component.scss"]
})

export class InformationComponent implements OnInit {
    public user:UserResponseData;
    public certificatesData:CertificateData;
    @Input() profileCertificates;
    @Input() certificates;
    @Output() deleted = new EventEmitter<any>();

    constructor(@Inject("FILE_URL") public fileUrl,private _userService:UserService) { 
    this.user=this._userService.user;
    }

    ngOnInit() { }

    public deleteCertificatesItem(): void {
        this.deleted.emit(true);
    }
}