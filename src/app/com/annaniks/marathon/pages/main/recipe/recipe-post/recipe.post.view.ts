import { Component, OnInit } from "@angular/core";
import { AddIngridientImageModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Slider } from '../../../../core/models';

@Component({
    selector: "recipe-post",
    templateUrl: "recipe-post.view.html",
    styleUrls: ["recipe-post.view.scss"]

})

export class RecipePostView implements OnInit {
    
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

    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    constructor(private _matDialog: MatDialog) { }

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

                    console.log(element, "element");
                })
            };
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }
            this.showImage = true;
            console.log(this.slides);

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
        console.log('slick initialized');
    }

    breakpoint(e) {
        console.log('breakpoint');
    }

    afterChange(e) {
        console.log('afterChange');
    }

    beforeChange(e) {
        console.log('beforeChange');
    }
}
