import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "app-settings",
    templateUrl: "settings.component.html",
    styleUrls: ["settings.component.scss"]
})

export class SettingsComponent implements OnInit {
    public isOpen: boolean = false;
    public role: string;
    @Input() type: string;
    @Output() openChanges = new EventEmitter();
    @Input('role')
    set setRole($event: string) {
        this.role = $event;
    }
    @Output('getButtonsType') _buttonsType = new EventEmitter();
    constructor() { }

    ngOnInit() { }

    public onClickOpenComments(): void {
        this.isOpen = !this.isOpen;
        this.openChanges.emit(this.isOpen);
    }
    public clickOnButton(type: string): void {
        if (this.role)
            this._buttonsType.emit(type)
    }
}