import { Component, OnInit, ViewChild, ElementRef, Inject } from "@angular/core";
import { AddIngridientImageModal } from '../../../../core/modals';
import { MatDialog } from '@angular/material/dialog';
import { FeedResponseData, UploadFileResponse } from '../../../../core/models';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { UserService } from '../../../../core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CountryService } from '../../../../core/services/country.service';
import { startWith, map, finalize, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { FeedService } from '../../feed/feed.service';
import { ReceiptData, Slider } from '../../../../core/models/receipt';

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
    public tag: any[] = [];
    public tagsCtrl = new FormControl('');
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public loading: boolean = false;
    public paramsId: number;
    public mediaContent: ReceiptData;
    public showmaCronutrients: boolean;
    public mediaUrl: string;
    public loaclImage: string = '/assets/images/food.png';
    public _unSbscribe = new Subject<void>();

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;


    constructor(
        @Inject('FILE_URL') private _fileUrl,
        private _matDialog: MatDialog,
        private _fb: FormBuilder,
        private _cookieService: CookieService,
        private _countryService: CountryService,
        private _activatedRouter: ActivatedRoute,
        private _feedService: FeedService,
        private _userService: UserService,
        private _router:Router,
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
                this.mediaUrl = params.url;
            })
    }


    ngOnInit() {
        if (!this.paramsId) {
            this.preparationStepItem.push(new FormControl(''));
            this.ingridientItem.push(new FormControl(''));
        }

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
            calories: [null],
            kcal: [null],
            carbs: [null],
            protein: [null],
            fat: [null],
            serving_size: [null],
            time: [null],
            information: [null],
            mass: [null],
            macronutrients: [],
        })
    }

    private _setPatchValue(): void {
        this.recipeFormGroup.patchValue({
            title: this.mediaContent.receipt.title,
            calories: this.mediaContent.receipt.calories,
            kcal: this.mediaContent.receipt.kcal,
            carbs: this.mediaContent.receipt.carbs,
            protein: this.mediaContent.receipt.protein,
            time: this.mediaContent.receipt.time,
            serving_size: this.mediaContent.receipt.serving_size,
            information: this.mediaContent.receipt.information,
            mass: this.mediaContent.receipt.mass,
            macronutrients: this.mediaContent.receipt.macronutrients,
            fat: this.mediaContent.receipt.fat,
        })
        for (let item of this.mediaContent.receipt.ingridient) {
            this.ingridientItem.push(new FormControl(item));
        }
        for (let item of this.mediaContent.receipt.preparationSteps) {
            this.preparationStepItem.push(new FormControl(item));

        }
        for (let item of this.mediaContent.receipt.tag) {
            this.tag.push(item);

        }
        for (let item of this.mediaContent.receipt.imageSlider) {
            if (this.slides.length >= 0) {
                this.showCarousel = true;
                this.showImage = false;
                this.slides.push({ img: item.img });
            }

        }
        if (this.mediaContent.receipt.videoLink) {
            this.showVideo = true;
            this.showImage = false;
            this.videoSources = [{
                src: this.mediaContent.receipt.videoLink,
                provider: 'youtube',
            }]

        }

        if (this.mediaContent.receipt.macronutrients === true) {
            this.showmaCronutrients = true;
        }

    }


    private _openAddIngridientImageModal(): void {
        const dialogRef = this._matDialog.open(AddIngridientImageModal, {
            width: "100%",
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
                    takeUntil((this._unSbscribe)),
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
        this._feedService.getFeedById(this.paramsId).pipe(takeUntil(this._unSbscribe))
            .subscribe((data: FeedResponseData) => {
                if (typeof data.feed_media[0].content === 'string') {
                    this.mediaContent = JSON.parse(data.feed_media[0].content);
                }

                this._setPatchValue();

            })
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.tagsItem.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

    /////--------------------PCTURE ULPOAD
    public setServicePhoto(image): void {
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);

                this._userService.uploadVideoFile(formData)
                    .subscribe((data: UploadFileResponse) => {
                        console.log(data);

                        this.slides.push({ img: this._fileUrl + data.file_name });
                        this.showCarousel = true;
                        this.showImage = false;

                    })
            }
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
        console.log(this.recipeFormGroup.value.calories);
        console.log(this.slides);

        this.loading = true;
        let receipt = {
            title: this.recipeFormGroup.value.title,
            calories: this.recipeFormGroup.value.calories,
            kcal: this.recipeFormGroup.value.kcal,
            carbs: this.recipeFormGroup.value.carbs,
            protein: this.recipeFormGroup.value.protein,
            fat: this.recipeFormGroup.value.fat,
            macronutrients: this.recipeFormGroup.value.macronutrients,
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
            is_public:true,
            content: JSON.stringify(
                {
                    url: '',
                    type: this.recipeType,
                    receipt: receipt
                }
            ),
        }
        if (!this.paramsId) {
            this._userService.postFeed(ReceiptResponseData).pipe(
                takeUntil((this._unSbscribe)),
                finalize(() => {
                    this.loading = false;
                    this.recipeFormGroup.enable();
                })
            )
                .subscribe((data) => {
                    this._router.navigate(['/feed']);

                })
        }
        else if (this.paramsId) {
            this._feedService.updateFeedById(this.mediaUrl, ReceiptResponseData).pipe(
                takeUntil((this._unSbscribe)),
                finalize(() => {
                    this.loading = false;
                    this.recipeFormGroup.enable();
                })
            )
                .subscribe((data) => {
                    this._router.navigate(['/feed']);

                })
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

    public changeMacronutrients(event): void {
        if (event.checked === false) {
            this.showmaCronutrients = false;
        }
        else {
            this.showmaCronutrients = true;
        }

    }

    public deleteCover(): void {
        this.showVideo = false;
        this.showImage = true;
        this.youtubeLink.setValue('');
    }
    public checkIsValid(controlName): boolean {
        return this.recipeFormGroup.get(controlName).hasError('required') && this.recipeFormGroup.get(controlName).touched;
    }

}
