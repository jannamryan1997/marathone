import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: "artivle-view",
    templateUrl: "article.view.html",
    styleUrls: ["article.view.scss"]
})

export class ArticleView implements OnInit {
    public articleGroup;
    unsubscribe$ = new Subject<void>()

    public showCreatedMenu: boolean = false;
    public showSetting: boolean = false;
    public isShowImageRedacor: boolean;
    public isShowVideoRedactor: boolean;
    public fileUrl: string = environment.fileUrl;
    constructor(public router: Router,
        private _cookieServie: CookieService,
        private _router: Router,
        private _fb: FormBuilder, private _userService: UserService) {
    }

    ngOnInit() {
        this._initGroup()
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

    }
    // private _setValue(){
    // let value = {
    //     cover: "1e7b63404cd2fb8e6525b2fd4ee4d286.1e7b63404cd2fb8e6525_iJDAjNw.png",
    //     text: [{ "attribute": "<p><strong>description</strong></p>\n" }],
    //     image: [{ "url": "default-user-image_Rc0EAog.png" }],
    //     video: [{ "link": "https://www.youtube.com/watch?v=S5hrP2wBaiE" }],
    //     type: "article"
    // };
    // if (value.cover)
    //     this.articleGroup.get('cover').setValue(value.cover)
    // for (const img of value.image) {
    //     this.articleGroup.get('images').push(this._fb.group(img))
    // }
    // for (const video of value.video) {
    //     this.articleGroup.get('videos').push(this._fb.group(video))
    // }
    // for (const text of value.text) {
    //     this.articleGroup.get('contentTexts').push(this._fb.group(text))
    // }

    // }
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
            let role: string = this._cookieServie.get('role');
            this._userService.postFeed({
                title: articleValue.title,
                content: JSON.stringify(
                    content
                ),
                role: role,

            }).pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
                this._router.navigate(['/feed']);
            })
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}