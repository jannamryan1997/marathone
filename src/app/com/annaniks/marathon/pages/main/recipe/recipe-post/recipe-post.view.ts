import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AddIngridientImageModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { Slider, FeedResponseData } from '../../../../core/models';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../../../core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CountryService } from '../../../../core/services/country.service';
import { startWith, map, finalize } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { FeedService } from '../../feed/feed.service';
import { ReceiptResponseData, ReceiptData } from '../../../../core/models/receipt';

@Component({
    selector: "recipe-post",
    templateUrl: "recipe-post.view.html",
    styleUrls: ["recipe-post.view.scss"]

})

export class RecipePostView implements OnInit {
    public visible = true;
    public selectable = true;
    public removable = true;
    public errorMesage: string;
    public showImage: boolean = true;
    public showCarousel: boolean = false;
    public showVideo: boolean = false;
    public localImage: string;
    public recipeFormGroup: FormGroup;
    public role: string;
    public recipeType: string = "recipeType";
    public videoSources = [];
    public youtubeLink = new FormControl('');
    public preparationStepItem = new FormArray([]);
    public ingridientItem = new FormArray([]);
    public slides: Slider[] = [];
    public slideConfig = {};
    public allTags = [];
    public tagsItem: string[] = [];
    public filteredTags: Observable<string[]>;
    public tag: string[] = [];
    public tagsCtrl = new FormControl('');
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public loading: boolean = false;
    public paramsId: number;
    public mediaContent:ReceiptData;

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;


    constructor(
        private _matDialog: MatDialog,
        private _fb: FormBuilder,
        private _cookieService: CookieService,
        private _userService: UserService,
        private _router: Router,
        private _countryService: CountryService,
        private _activatedRouter: ActivatedRoute,
        private _feedService: FeedService,
    ) {
        this.role = this._cookieService.get('role');

        this.slideConfig = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000
        },
            this._activatedRouter.queryParams.subscribe((params) => {
                this.paramsId = params.feedId;
            })
    }


    ngOnInit() {
        if (this.slides.length) {
            this.showCarousel = true;
            this.showImage = false;
        }
        this._formBuilder();
        this._getCountry();

        if (this.paramsId) {
            this._getFeedById();
      
        }
    }

    private _formBuilder(): void {
        this.recipeFormGroup = this._fb.group({
            title: [null, Validators.required],
            calories: [null, Validators.required],
            kcal: [null, Validators.required],
            carbs: [null, Validators.required],
            protein: [null, Validators.required],
            fat: [null, Validators.required],
            serving_size: [null, Validators.required],
            time: [null, Validators.required],
            information: [null, Validators.required],
            mass: [null],
        })
    }

    private _setPatchValue():void{
    this.recipeFormGroup.patchValue({
        title:this.mediaContent.receipt.title,
        calories:this.mediaContent.receipt.calories,
        kcal:this.mediaContent.receipt.kcal,
        carbs:this.mediaContent.receipt.carbs,
        protein:this.mediaContent.receipt.protein,
        time:this.mediaContent.receipt.time,
        serving_size:this.mediaContent.receipt.serving_size,
        information:this.mediaContent.receipt.information,
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
            if (data === 'closeAfterrRemove') {
                this.showCarousel = false;
                this.showImage = true;
            }

        })
    }

    private _getCountry(): void {
        this._countryService.getCountry().subscribe((data) => {
            this.allTags = data;
            for (let item of this.allTags) {
                this.tagsItem.push(item.name)
                this.filteredTags = this.tagsCtrl.valueChanges.pipe(
                    startWith(null),
                    map((fruit: string | null) => fruit ? this._filter(fruit) : this.tagsItem.slice()));

            }
        })
    }


    private _markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this._markFormGroupTouched(control);
            }
        });
    }

    private _getFeedById(): void {
        this._feedService.getFeedById(this.paramsId)
            .subscribe((data:FeedResponseData) => {
               console.log(data);
               if(typeof data.feed_media[0].content==='string'){
                   this.mediaContent=JSON.parse(data.feed_media[0].content)
               }
               console.log(this.mediaContent);
               this._setPatchValue();
               
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


    public postRecipe(): void {
        this.loading = true;
        // this.recipeFormGroup.disable();
        console.log(this.recipeFormGroup);
        console.log(this.recipeFormGroup.valid);


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
            tag: this.tag,
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
        if ((this.slides.length > 0 || this.youtubeLink.value) && this.recipeFormGroup.valid) {
            this._userService.postFeed(ReceiptResponseData).pipe(
                finalize(() => {
                    this.loading = false;
                    this.recipeFormGroup.enable();
                })
            )
                .subscribe((data) => {
                    this._router.navigate(['/feed']);

                })
        }
        else {

            this.loading = false;
            this.recipeFormGroup.enable();
            this.errorMesage = "Please post a picture or video";
            this._markFormGroupTouched(this.recipeFormGroup);
        }

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

    public play(): void {
        this.videoSources = [{
            src: this.youtubeLink.value,
            provider: 'youtube',
        }]
        this.showVideo = true;
        this.showImage = false;
    }


    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.tag.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.tagsCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.tag.indexOf(fruit);

        if (index >= 0) {
            this.tag.splice(index, 1);
        }
    }


    selected(event: MatAutocompleteSelectedEvent): void {
        this.tag.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.tagsCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.tagsItem.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }


    public checkIsValid(controlName): boolean {
        return this.recipeFormGroup.get(controlName).hasError('required') && this.recipeFormGroup.get(controlName).touched;
    }

}
