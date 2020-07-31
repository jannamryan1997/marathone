import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
    selector: "app-delete-feed-item",
    templateUrl: "delete-feed-item.component.html",
    styleUrls: ["delete-feed-item.component.scss"]
})

export class DeleteFeedItemComponent implements OnInit {
    public role: string;
    public isModalMode: boolean = false;
    @Output() deleted = new EventEmitter<any>();
    @Input() content;
    @Input() feedId: number;
    @Input() mediaUrl: string;
    @Output() editFeedItem=new EventEmitter<any>();
    constructor(private _cookieService: CookieService, private _router: Router) {
        this.role = this._cookieService.get('role');


    }

    ngOnInit() {

    }
    

    public deletedFeedItem(): void {
        this.deleted.emit(true);
    }

    public onClickGoEditPage(): void {
        let router: string;
        if (this.content === 'recipeType') {
            router = `/recipe/recipe-post/${this.feedId}`;

            this._router.navigate([router], { queryParams: { feedId: this.feedId, url: this.mediaUrl } })
        }
        else if (this.content === 'image' || this.content === 'video' || this.content === undefined || this.content==='videoLink') {
            this.isModalMode = true;
        }


    }
    public onClickOverlay(): void {
        this.isModalMode = false;
    }
    public closeEditModal(event): void {
        if (event) {
            this.isModalMode = false;
            this.editFeedItem.emit(true);
        }
    }

}