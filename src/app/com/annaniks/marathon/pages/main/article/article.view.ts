import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleService } from './article.service';
import { FeedResponseData } from '../../../core/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: "artivle-view",
    templateUrl: "article.view.html",
    styleUrls: ["article.view.scss"]
})

export class ArticleView implements OnInit {
    public articleGroup: FormGroup;
    private unsubscribe$ = new Subject<void>()
    public config;
    public showCreatedMenu: boolean = false;
    public showSetting: boolean = false;
    public isShowImageRedacor: boolean;
    public isShowVideoRedactor: boolean;
    private _articleId: number;
    private _article: FeedResponseData;
    public fileUrl: string = environment.fileUrl;
    public combinationId: number;
    constructor(public router: Router,
        private _cookieServie: CookieService,
        private _router: Router,
        private _articleService: ArticleService,
        private _fb: FormBuilder, private _userService: UserService,
        private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this._articleId = params.id;
        })
    }

    ngOnInit() {
        this._initConfig();
        this._initGroup();
        // this._autosize();
    }
    private _initConfig() {
        this.config = {
            toolbar: [['Bold', 'Italic', 'Underline'], ['RemoveFormat'], ['Blockquote'], ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['NumberedList', 'BulletedList'], ['Link'], ['FontSize']]
        };
    }
    onDrop(evt) { }

    private _autosize(index: number) {
        const el = document.getElementById('text' + index);
        setTimeout(() => {
            // el.style.cssText = 'height:auto; padding:0';
            // el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    }
    public changeText(index: number) {
        // this._autosize(index)
    }
    private _initGroup() {
        this.articleGroup = this._fb.group({
            cover: [null, Validators.required],
            title: [null, Validators.required],
            arrays: this._fb.array([]),
            currentYoutubeLink: [null],
        })
        if (this._articleId) {
            this._getArticleById()
        } else {
            this._createControls('text');
        }
    }
    private _createControls(controlName: string, defaultImage = null) {
        (this.articleGroup.get('arrays') as FormArray).push(this._fb.group({ type: controlName, value: defaultImage }));
    }
    private _getArticleById() {
        this._articleService.getArticleById(this._articleId).pipe(takeUntil(this.unsubscribe$)).subscribe((data: FeedResponseData) => {
            this._article = data;
            this.articleGroup.get('title').setValue(this._article.title);
            this._setValue()
        })
    }
    private _setValue() {
        if (this._article && this._article.feed_media && this._article.feed_media[0] && this._article.feed_media[0].content) {
            let data = JSON.parse(this._article.feed_media[0].content)
            if (data.cover)
                this.articleGroup.get('cover').setValue(data.cover);
            for (let array of data.arrays) {
                (this.articleGroup.get('arrays') as FormArray).push(this._fb.group(array))
            }
        }
    }
    private _uploadFile(image, type: string, control?: FormGroup) {
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);
                this._userService.uploadVideoFile(formData).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                    if (data && data.file_name) {
                        if (type == 'image') {
                            control.get('value').setValue(data.file_name)
                            // this._createControls('image', data.file_name)
                        } else {
                            (this.articleGroup.get('cover').setValue(data.file_name));
                        }
                    }
                })
            }
        }
    }

    public removeControl(event, index: number): void {
        if (event) {
            (this.articleGroup.get('arrays') as FormArray).removeAt(index);
        }
    }
    public sendVideo(control): void {
        // this.getControls();
        console.log(this.isShowVideoRedactor);

        console.log("ggg")
        if (control.get('value').value) {
            // control.get('value').setValue()
            // this._createControls('video', this.articleGroup.get('currentYoutubeLink').value)
            // this.articleGroup.get('currentYoutubeLink').reset();
            // this.closeContentVideo();
            // control.get(')'
        }
    }
    public deleteCover() {
        this.articleGroup.get('cover').reset()
    }
    public deleteArticle() {
        if (this._articleId)
            this._articleService.deleteArticle(this._articleId).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
                this._router.navigate(['/feed']);
            })
    }
    public setArticleCover(event) {
        if (event) {
            this.isShowImageRedacor = false;
            const reader = new FileReader();
            reader.onload = (e: any) => { }
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }
            this._uploadFile(event, 'cover')
        }
    }
    public setServicePhoto(event, control): void {
        if (event) {
            this.isShowImageRedacor = false;
            const reader = new FileReader();
            reader.onload = (e: any) => { }
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }
            this._uploadFile(event, 'image', control)

        }
    }


    public removeTextContent(index: number) {
        // let formArray = this.articleGroup.get('contentTexts') as FormArray;
        // formArray.removeAt(index)
        (this.articleGroup.get('arrays') as FormArray).removeAt(index);
    }
    public closeContentImage(index) {
        (this.articleGroup.get('arrays') as FormArray).removeAt(index);

    }
    public closeContentVideo(index) {
        (this.articleGroup.get('arrays') as FormArray).removeAt(index);
    }
    public addContent() {
        // if (!this.isShowImageRedacor && !this.isShowVideoRedactor) {
        this._createControls('text')
        // }
    }

    public drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.getControls(), event.previousIndex, event.currentIndex);
    }

    public addImage() {
        // if (!this.isShowVideoRedactor)
        // this.isShowImageRedacor = true;
        this._createControls('image', null)
    }
    public addVideo() {
        // if (!this.isShowImageRedacor)
        // this.isShowVideoRedactor = true;
        this._createControls('video', null)
    }
    public onClickShowCreatedMenu(): void {
        this.showCreatedMenu = !this.showCreatedMenu;
    }

    public onClickShowSetting(): void {
        this.showSetting = !this.showSetting;
    }
    public publish(event) {
        if (this.articleGroup.valid) {
            const articleValue = this.articleGroup.value;
            let content = {
                cover: articleValue.cover,
                arrays: articleValue.arrays,
                type: 'article',
            };
            let articleData = {
                title: articleValue.title,
                content: JSON.stringify(
                    content
                ),
                role: this._cookieServie.get('role'),
                is_public: true,

            }
            if (!this._articleId) {
                this._userService.postFeed(articleData).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                    this.combinationId=data.id;
                    console.log(this.combinationId);
                    if(event === 'preview'){
                        this._router.navigate([`combination/${this.combinationId}`])
                    }
                    else{
                        this._router.navigate(['/feed']);
                    }
                  
                })
            } else {
                this._articleService.updateArticle(this._articleId, articleData).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                    if(event === 'preview'){
                        this._router.navigate([`combination/${this._articleId}`])
                    }
                    else{
                        this._router.navigate(['/feed']);
                    }
                })
            }
        }
    }
    public getControls() {
        return (this.articleGroup.get('arrays') as FormArray).controls
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    get articleId(): number {
        return this._articleId
    }
}