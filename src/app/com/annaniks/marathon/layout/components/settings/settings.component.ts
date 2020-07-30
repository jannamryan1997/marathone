import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "app-settings",
    templateUrl: "settings.component.html",
    styleUrls: ["settings.component.scss"]
})

export class SettingsComponent implements OnInit {
    public isOpen: boolean = false;
    public role: string;
    public feed;
    public message: string;
    @Input() type: string;
    @Output() openChanges = new EventEmitter();
    @Output() showFollowModel = new EventEmitter();
    @Input('feed')
    set setFeed($event) {
        this.feed = $event
    }
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

        this._buttonsType.emit(type);
        this.showFollowModel.emit(true);
        if (type === 'reposts') {
            this.message = "repost";
        }

    }
}