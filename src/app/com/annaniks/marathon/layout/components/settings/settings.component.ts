import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "app-settings",
    templateUrl: "settings.component.html",
    styleUrls: ["settings.component.scss"]
})

export class SettingsComponent implements OnInit {
    public isOpen: boolean = false;
    @Input() type: string;
    @Output() openChanges = new EventEmitter();
    constructor() { }

    ngOnInit() { }
    
    public onClickOpenComments(): void {
        this.isOpen = !this.isOpen;
        this.openChanges.emit(this.isOpen);
    }
}