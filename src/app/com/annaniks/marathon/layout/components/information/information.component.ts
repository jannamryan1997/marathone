import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";

@Component({
    selector: "app-information",
    templateUrl: "information.component.html",
    styleUrls: ["information.component.scss"]
})

export class InformationComponent implements OnInit {
    @Input() profileCertificates;
    @Input() certificates;
    @Output() deleted = new EventEmitter<any>();

    constructor(@Inject("FILE_URL") public fileUrl) { }

    ngOnInit() { }

    public deleteCertificatesItem(): void {
        this.deleted.emit(true);
    }
}