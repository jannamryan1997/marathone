import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { AddIngridientImageModal } from '../../../../core/modals';

@Component({
    selector: "ingridient-recipe-view",
    templateUrl: "ingridient-recipe.view.html",
    styleUrls: ["ingridient-recipe.view.scss"]
})

export class IngridientRecipeView implements OnInit {

    constructor(private _matDialog: MatDialog) { }

    ngOnInit() {
        this._openAddIngridientImageModal();
    }

    private _openAddIngridientImageModal(): void {
        const dialogRef = this._matDialog.open(AddIngridientImageModal, {
            width: "100%",
            maxWidth: "100vw",
            height: "100vh",
        })
    }
}