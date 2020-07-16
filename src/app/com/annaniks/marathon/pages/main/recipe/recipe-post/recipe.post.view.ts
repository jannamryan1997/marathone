import { Component, OnInit } from "@angular/core";
import { AddIngridientImageModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Slider } from '../../../../core/models';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';


@Component({
    selector: "recipe-post",
    templateUrl: "recipe-post.view.html",
    styleUrls: ["recipe-post.view.scss"]

})

export class RecipePostView implements OnInit {

    public showImage: boolean = true;
    public showCarousel: boolean = false;
    public showVideo: boolean = false;
    public localImage: string;
    public recipeFormGroup: FormGroup;
    public role: string;
    public recipeType: string = "recipeType";
    public videoSources = [];
    public youtubeLink = new FormControl('');

    preparationStepItem = new FormArray([]);
    ingridientItem = new FormArray([]);


    public tagsItem = []

    public slides: Slider[] = [];

    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    constructor(
        private _matDialog: MatDialog,
        private _fb: FormBuilder,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _router: Router,
    ) {
        this.role = this._cookieService.get('role');
        console.log(this.role);

    }

    ngOnInit() {
        if (this.slides.length) {
            this.showCarousel = true;
            this.showImage = false;
        }
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.recipeFormGroup = this._fb.group({
            title: [null, Validators.required],
            calories: [null, Validators.required],
            kcal: [null, Validators.required],
            carbs: [null],
            protein: [null],
            fat: [null],
            serving_size: [null],
            time: [null],
            information: [null],
            mass: [null],
            tags: [null],
        })
    }

    private _openAddIngridientImageModal(): void {
        const dialogRef = this._matDialog.open(AddIngridientImageModal, {
            width: "100%",
            maxWidth: "100vw",
            data: {
                data: this.slides
            }
        })
        dialogRef.afterClosed().subscribe((data) => {
            console.log(data);
            if (data === 'closeAfterrRemove') {
                this.showCarousel = false;
                this.showImage = true;
            }

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
            this.showCarousel = true;
            this.showImage = false;

        }
    }

    public addPreparationStep(): void {
        this.preparationStepItem.push(new FormControl(''));
    }

    public addIngridientItem(): void {
        this.ingridientItem.push(new FormControl(''));
    }

    public onClickOpenIngridientModal(): void {
        this._openAddIngridientImageModal();
    }

    public addTag(): void {
        this.tagsItem.push({ tagimg: "", tagtitle: this.recipeFormGroup.value.tags })
    }
    public removeTegsItem(ind): void {
        this.tagsItem.splice(ind, 1);
    }

    slickInit(e) { }

    breakpoint(e) { }

    afterChange(e) { }

    beforeChange(e) { }





    public postRecipe(): void {
        let receipt = {
            title: this.recipeFormGroup.value.title,
            calories: this.recipeFormGroup.value.calories,
            kcal: this.recipeFormGroup.value.kcal,
            carbs: this.recipeFormGroup.value.carbs,
            protein: this.recipeFormGroup.value.protein,
            fat: this.recipeFormGroup.value.fat,
            serving_size: this.recipeFormGroup.value.serving_size,
            time: this.recipeFormGroup.value.time,
            information: this.recipeFormGroup.value.information,
            preparationSteps: this.preparationStepItem.value,
            ingridient: this.ingridientItem.value,
            tag: this.tagsItem,
            mass: this.recipeFormGroup.value.mass,
            imageSlider: this.slides,
            videoLink: this.youtubeLink.value,
        }
        const ReceiptResponseData = {
            role: this.role,
            content: JSON.stringify(
                {
                    url: '',
                    type: this.recipeType,
                    receipt: receipt
                }
            ),
        }
        this._userService.postFeed(ReceiptResponseData).subscribe
            ((data) => {
                console.log(data, "ggggggggg");
                this._router.navigate(['/feed']);

            })


    }
    public removeRecipeImageItem(event, ind): void {
        if (event) {
            this.slides.splice(ind, 1);
            if (this.slides.length) {
                this.showCarousel = true;
                this.showImage = false;
            }
            else {
                this.showCarousel = false;
                this.showImage = true;
            }

        }
    }

    play(): void {
        this.videoSources = [{
            src: this.youtubeLink.value,
            provider: 'youtube',
        }]
        this.showVideo = true;
        this.showImage = false;
    }
}
