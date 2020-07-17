import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleService } from './article.service';
import { FeedResponseData } from '../../../core/models';

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
        this._initGroup()
    }
    private _initConfig() {
        this.config = {
            toolbar: [['Bold', 'Italic', 'Underline', 'Subscript', 'Superscript'],['RemoveFormat'], ['Blockquote'], ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['NumberedList', 'BulletedList'], ['Link']]
        };
    }
    private _initGroup() {
        this.articleGroup = this._fb.group({
            cover: [null],
            title: [null],
            currentYoutubeLink: [null],
            contentTexts: this._fb.array([]),
            images: this._fb.array([]),
            videos: this._fb.array([])
        })
        if (this._articleId) {
            this._getArticleById()
        }
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
                this.articleGroup.get('cover').setValue(data.cover)
            for (const img of data.image) {
                (this.articleGroup.get('images') as FormArray).push(this._fb.group(img))
            }
            for (const video of data.video) {
                (this.articleGroup.get('videos') as FormArray).push(this._fb.group(video))
            }
            for (const text of data.text) {
                (this.articleGroup.get('contentTexts') as FormArray).push(this._fb.group(text))
            }
        }

    }
    public deleteImageOrVideo(event: boolean, index: number, controlName: string): void {
        if (event) {
            (this.articleGroup.get(controlName) as FormArray).removeAt(index);
        }
    }
    public sendVideo(): void {
        if (this.articleGroup.get('currentYoutubeLink').value) {
            (this.articleGroup.get('videos') as FormArray).push(this._fb.group({ link: this.articleGroup.get('currentYoutubeLink').value }));
            this.articleGroup.get('currentYoutubeLink').reset();
            this.closeContentVideo();
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
    public setServicePhoto(event): void {
        if (event) {
            this.isShowImageRedacor = false;
            const reader = new FileReader();
            reader.onload = (e: any) => { }
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }
            this._uploadFile(event, 'image')

        }
    }
    private _uploadFile(image, type: string) {

        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);
                this._userService.uploadVideoFile(formData).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                    if (data && data.file_name) {
                        if (type == 'image') {
                            (this.articleGroup.get('images') as FormArray).push(this._fb.group({ url: data.file_name }))
                        } else {
                            (this.articleGroup.get('cover').setValue(data.file_name));
                        }
                    }
                })
            }
        }

    }
    public removeTextContent(index: number) {
        let formArray = this.articleGroup.get('contentTexts') as FormArray;
        formArray.removeAt(index)
    }
    public closeContentImage() {
        this.isShowImageRedacor = false;

    }
    public closeContentVideo() {
        this.isShowVideoRedactor = false;

    }
    public addContent(controlName: string) {
        (this.articleGroup.get(controlName) as FormArray).push(this._fb.group({ attribute: null }))
    }
    public addImage() {
        this.isShowImageRedacor = true;
    }
    public addVideo() {
        this.isShowVideoRedactor = true;
    }
    public onClickShowCreatedMenu(): void {
        this.showCreatedMenu = !this.showCreatedMenu;
    }

    public onClickShowSetting(): void {
        this.showSetting = !this.showSetting;
    }

    public publish() {

        if (this.articleGroup.value) {
            const articleValue = this.articleGroup.value;
            let content = {
                cover: articleValue.cover,
                text: articleValue.contentTexts,
                image: articleValue.images,
                video: articleValue.videos,
                type: 'article',
            };
            let articleData = {
                title: articleValue.title,
                content: JSON.stringify(
                    content
                ),
                role: this._cookieServie.get('role'),

            }
            if (!this._articleId) {
                this._userService.postFeed(articleData).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                    this._router.navigate(['/feed']);
                })
            } else {
                this._articleService.updateArticle(this._articleId, articleData).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                    this._router.navigate(['/feed']);
                })
            }
        }
    }
    public getControls(controlName: string) {
        return (this.articleGroup.get(controlName) as FormArray).controls
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    get articleId(): number {
        return this._articleId
    }
}