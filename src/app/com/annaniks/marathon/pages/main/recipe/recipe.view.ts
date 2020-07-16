import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Slider } from '../../../core/models';
import { AddIngridientImageModal } from '../../../core/modals';

@Component({
    selector: "recipe-view",
    templateUrl: "recipe.view.html",
    styleUrls: ["recipe.view.scss"]
})

export class RecipeView implements OnInit {

    public showImage: boolean = false;
    public localImage: string;
    public preparationStepItem = [
        {}
    ];

    public ingridientItem = [{}];

    public tagsItem = [
        { img: "", title: "" }
    ]

    public slides: Slider[] = [
        {img: "assets/images/food.png"},
        {img: "/assets/images/foodimg.png"},
        {img: "assets/images/food.png"},
        {img: "/assets/images/foodimg.png"},
    ];

    slideConfig = { };
    constructor(private _matDialog: MatDialog) { 
        this.slideConfig = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000
        }
    }

    ngOnInit() {
        if (this.slides.length) {
            this.showImage = true;
        }
    }

    private _openAddIngridientImageModal(): void {
        const dialogRef = this._matDialog.open(AddIngridientImageModal, {
            width: "100%",
            maxWidth: "100vw",
        })
    }
    public setServicePhoto(event): void {
        if (event) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.slides.push({ img: e.target.result });
                this.slides.map((element, index) => {
                })
            };
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }
            this.showImage = true;

        }
    }

    public addPreparationStep(): void {
        this.preparationStepItem.push({});
    }
    public addIngridientItem(): void {
        this.ingridientItem.push({});
    }

    public onClickOpenIngridientModal(): void {
        this._openAddIngridientImageModal();
    }

    public addTag(): void {
        this.tagsItem.push({ img: "", title: "lanch" })
    }
    public removeTegsItem(ind): void {
        this.tagsItem.splice(ind, 1);
    }

    slickInit(e) {
    }

    breakpoint(e) {
    }

    afterChange(e) {
    }

    beforeChange(e) {
    }
}