import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, Inject, AfterViewInit } from "@angular/core";
import { FormControl, } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { UploadFileResponse, FeedResponseData } from '../../../core/models';
import { FeedService } from '../../../pages/main/feed/feed.service';
import { CookieService } from 'ngx-cookie';
import { finalize, takeUntil } from 'rxjs/operators';
import { ReceiptData } from '../../../core/models/receipt';
import { Subject } from 'rxjs';

@Component({
    selector: "app-create-publication",
    templateUrl: "create-publication.component.html",
    styleUrls: ["create-publication.component.scss"]
})


export class CreatePublicationComponent implements OnInit {
    public videoTitle: string;
    public videoPleyer: boolean = true;
    public i18n;
    public isModalMode: boolean = false;
    public postType = new FormControl('');
    public videoSources = [];
    public _unsbscribe = new Subject<void>();
    @Input() feedItem: FeedResponseData;
    @Input() feedId: number;
    @Input() editProfile: boolean;
    @Input() mediaUrl: string;
    @Input() style: boolean;
    @Output('postCreateEvent') private _postCreateEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() closeEditModal = new EventEmitter<any>();
    @ViewChild('inputImageReference') private _inputImageReference: ElementRef;
    @ViewChild('inputVideoReference') private _inputVideoReference: ElementRef;

    @Output() autoSize = new EventEmitter<any>();
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
    public mediaContent: ReceiptData;

    constructor(
        public _userService: UserService,
        private _feedService: FeedService,
        private _cookieServie: CookieService,

        @Inject("FILE_URL") private _fileUrl,
    ) {
    }

    ngOnInit() {
        if (this.editProfile) {
            this._getFeedById();
        }
        this._autosize();

        this._initi18n();
        this._setPatchValue();
    }

    private _initi18n() {
        this.i18n = {

            search: 'Search',
            emojilist: 'List of emoji',
            notfound: 'No Emoji Found',
            clear: 'Clear',
            categories: {
                search: 'Search Results',
                recent: 'Frequently Used',
                people: 'Smileys & People',
                nature: 'Animals & Nature',
                foods: 'Food & Drink',
                activity: 'Activity',
                places: 'Travel & Places',
                objects: 'Objects',
                symbols: 'Symbols',
                custom: 'Custom',
            },
            skintones: {
                1: 'Default Skin Tone',
                2: 'Light Skin Tone',
                3: 'Medium-Light Skin Tone',
                4: 'Medium Skin Tone',
                5: 'Medium-Dark Skin Tone',
                6: 'Dark Skin Tone',
            },
        }
    }

    private _setPatchValue(): void {
        this.postType.valueChanges.subscribe((data) => {
            if (this.videoPleyer) {
                this.videoTitle = data;
            }
            this.play();
        })
        this.videoPleyer = true;
    }

    private _autosize() {
        const el = document.getElementById('textarea');
        this.postType.valueChanges.subscribe((data) => {
            this.autoSize.emit(data);
            setTimeout(() => {
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        })

    }

    private _getFeedById(): void {
        this._feedService.getFeedById(this.feedId)
            .pipe(takeUntil(this._unsbscribe))
            .subscribe((data: FeedResponseData) => {
                this.postType.setValue(data.title);
                if (typeof data.feed_media[0].content === 'string') {
                    this.mediaContent = JSON.parse(data.feed_media[0].content);
                    this.isModalMode = true;
                    if (this.mediaContent.type === 'image') {
                        this.uploadType = "image";
                        this.controImageItem = this._fileUrl + this.mediaContent.url;
                    }
                    else if (this.mediaContent.type === 'video') {
                        this.uploadType = "video";
                        this.controVideoItem = this._fileUrl + this.mediaContent.url;
                    }

                }

            })
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
                    },
                        err => {
                            this.loading = false;
                        }
                    )

            }
        }
        if (this.showYoutube) {
            this.showYoutube = false;
        }
    }


    private resetImageUplaodInput(): void {
        this._inputImageReference.nativeElement.value = '';
    }

    private resetVideoUplaodInput(): void {
        this._inputVideoReference.nativeElement.value = '';
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
    }



    public createdPost(): void {
        this.loading = true;
        let content = JSON.stringify(
            {
                url: this.contentFileName,
                type: this.uploadType,
                videoTitle: this.videoTitle,
            }
        )
        let role: string = this._cookieServie.get('role');
        if (!this.editProfile) {
            this._userService.postFeed({
                title: this.postType.value,
                content: content,
                role: role,
                is_public: true,

            })
                .pipe(
                    takeUntil((this._unsbscribe)),
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
                    this.videoPleyer = true;

                })
        }
        else if (this.editProfile) {
            let content = JSON.stringify(
                {
                    url: this.contentFileName,
                    type: this.uploadType,
                    videoTitle: this.videoTitle,
                }
            )
            this._feedService.updateFeedById(this.mediaUrl,
                {
                    title: this.postType.value,
                    content: content,
                    role: role,
                    is_public: true,


                })
                .pipe(
                    takeUntil((this._unsbscribe)),
                    finalize(() => {
                        this.closeEditModal.emit(true);
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
                    this.videoPleyer = true;
                })
        }
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
        this.showYoutube = false;
        this.player = null;
        this.showemoji = false;
        this.videoPleyer = true;
    }

    public play(): void {
        if (this.videoPleyer && this.postType.value.slice(0, 8) === 'https://') {
            this.videoSources = [{
                src: this.postType.value,
                provider: 'youtube',
            }]

            this.showYoutube = true;


            this.contentFileName = this.postType.value,
                this.uploadType = 'videoLink'
            this.videoPleyer = false;

        }
        // if(!this.showYoutube  && this.postType.value.slice(0, 8) === 'https://'){
        //     this.showYoutube = true;
        //     this.videoPleyer = true;
        // }  


        //     else {
        //         title = this.postType.value.slice(0, 22);
        //     }
        //     if (title === 'www.youtube.com/watch?' || title === 'https://www.youtube.com/watch?') {
        //         this.showYoutube = true;
        //         this.contentFileName = this.postType.value,
        //             this.uploadType = 'videoLink'
        //     }
        //     else {
        //         this.showYoutube = false;
        //     }

    }
    public closeVideo(): void {
        this.showYoutube = false;
        this.videoPleyer = false;
        this.postType.patchValue('');
        this.videoTitle = '';
    }

}



























