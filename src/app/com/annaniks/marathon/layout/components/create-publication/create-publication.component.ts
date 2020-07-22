import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Inject } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { UploadFileResponse, FeedData } from '../../../core/models';
import { FeedService } from '../../../pages/main/feed/feed.service';
import { CookieService } from 'ngx-cookie';
import { finalize } from 'rxjs/operators';

@Component({
    selector: "app-create-publication",
    templateUrl: "create-publication.component.html",
    styleUrls: ["create-publication.component.scss"]
})

export class CreatePublicationComponent implements OnInit {
    public isModalMode: boolean = false;
    @Input() feedItem: any;
    public postType = new FormControl('');
    public videoSources = [];
    @Output('postCreateEvent') private _postCreateEvent: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('inputImageReference') private _inputImageReference: ElementRef;
    @ViewChild('inputVideoReference') private _inputVideoReference: ElementRef;

    public uploadType: string;
    public showemoji: boolean = false;
    public controImageItem: string = "";
    public controVideoItem: string = "";
    public player;
    public YT: any;

    public videoTumble: string;
    public contentFileName: string = '';
    public loading = false;
    public showYoutube: boolean = false;

    constructor(
        public _userService: UserService,
        private _feedService: FeedService,
        private _cookieServie: CookieService,
        @Inject("FILE_URL") private _fileUrl,
    ) { }

    ngOnInit() {
    }


    private _setFormDataForImage(image) {
        this.loading = true;
        let fileName: string;
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                if (this.uploadType === 'video') {
                    formData.append('video', file, file.name);
                }
                else {
                    formData.append('file', file, file.name);
                }

                this._userService.uploadVideoFile(formData)
                    .subscribe((data: UploadFileResponse) => {
                        fileName = this._fileUrl + data.file_name;
                        this.contentFileName = data.file_name;
                        this.videoTumble = this._fileUrl + 'vido_tumbl/' + data.file_name_tumbl;
                        if (this.uploadType === 'image') {
                            this.resetImageUplaodInput()
                            this.controImageItem = fileName;
                        }
                        else if (this.uploadType === 'video') {
                            this.resetVideoUplaodInput()
                            this.controVideoItem = fileName;

                        }
                        this.loading = false;
                    })
            }
        }
    }


    private resetImageUplaodInput(): void {
        this._inputImageReference.nativeElement.value = ''
    }

    private resetVideoUplaodInput(): void {
        this._inputVideoReference.nativeElement.value = ''
    }

    public addEmoji(event): void {

        let data = this.postType.value + event.emoji.native;
        this.postType.patchValue(data)

    }

    public showEmoji(): void {
        this.showemoji = !this.showemoji;
    }



    public setServicePhoto(event, type) {
        if (type === 'image') {
            this.uploadType = 'image';
        }
        else {
            this.uploadType = 'video';
        }

        this._setFormDataForImage(event);
        if (this.player) {
            this.player.stopVideo();
            this.player.destroy();
        }
        this.player = null;
    }




    public closeControlItem(): void {
        this.uploadType = null;
        if (this.postType.value === '' || this.postType.value === null) {
        }
    }



    public createdPost(): void {
        this.loading = true;
        let role: string = this._cookieServie.get('role');
        this._userService.postFeed({
            title: this.postType.value,
            content: JSON.stringify(
                {
                    url: this.contentFileName,
                    type: this.uploadType,
                }
            ),
            role: role,

        })
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.postType.patchValue('');
                    this.uploadType = null;
                    this.controImageItem = '';
                    this.controVideoItem = '';
                    this.isModalMode = false;
                    this.showYoutube = false;
                    this._postCreateEvent.emit();
                })
            )
            .subscribe((data) => {
            })
    }


    public showPost(): void {
        this.isModalMode = true;
    }


    public onClickOverlay(): void {
        this.isModalMode = false;
        this.postType.patchValue('');
        this.uploadType = null;
        this.controImageItem = '';
        this.controVideoItem = '';
        this.isModalMode = false;
        this.showYoutube = false;

        this.player = null;
    }

    play(): void {
        let title;
        this.videoSources = [{
            src: this.postType.value,
            provider: 'youtube',
        }]
        if (this.postType.value.slice(0, 8) === 'https://') {
            title = this.postType.value.slice(0, 30);
        }
        else {
            title = this.postType.value.slice(0, 22);
        }
        if (title === 'www.youtube.com/watch?' || title === 'https://www.youtube.com/watch?') {
            this.showYoutube = true;
            this.contentFileName = this.postType.value,
                this.uploadType = 'videoLink',
                console.log(this.contentFileName, this.uploadType);

        }
        else {
            this.showYoutube = false;
        }


    }

}



























