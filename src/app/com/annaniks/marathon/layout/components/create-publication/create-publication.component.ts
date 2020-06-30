import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { RecipeResponseData, UploadFileResponse, FeedData } from '../../../core/models';
import { FeedService } from '../../../pages/main/feed/feed.service';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: "app-create-publication",
    templateUrl: "create-publication.component.html",
    styleUrls: ["create-publication.component.scss"]
})

export class CreatePublicationComponent implements OnInit {
    public isModalMode: boolean = false;
    @Input() feedItem: any;
    public postType = new FormControl();
    @Output('postCreateEvent') private _postCreateEvent: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('inputImageReference') private _inputImageReference: ElementRef;
    @ViewChild('inputVideoReference') private _inputVideoReference: ElementRef;

    private _videoId: string;
    public uploadType: string;
    public showemoji: boolean = false;
    public controImageItem: string = "";
    public controVideoItem: string = "";
    public player;
    public YT: any;

    public videoTumble: string;
    public contentFileName: string = '';
    public loading = false;

    constructor(
        public _userService: UserService,
        private _feedService: FeedService,
        private _cookieServie: CookieService
    ) { }

    ngOnInit() {
    }

    private _parseYoutubeUrl(url: string): string {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : null;
    }

    private _initPlayer(): void {
        if (window['YT']) {
            this._startVideo();
            return;
        }
        let tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window['onYouTubeIframeAPIReady'] = () => this._startVideo();
    }

    private _startVideo(): void {
        this.YT = window['YT'];
        if (this.player) {
            this.player.loadVideoById({
                videoId: this._videoId,
            });
            return;
        }
        this.player = new window['YT'].Player('player', {
            events: {
                onStateChange: this._onPlayerStateChange.bind(this),
                onError: this._onPlayerError.bind(this),
                onReady: (e) => {
                    this.player.loadVideoById({
                        videoId: this._videoId,
                    });
                }

            }
        });
        this.contentFileName = this._videoId;
        this.uploadType = 'videoLink';
        console.log(this.contentFileName);

    }


    private _onPlayerStateChange(event): void {
        switch (event.data) {
            case window['YT'].PlayerState.PLAYING:
                if (this._cleanTime() == 0) {
                    console.log('started ' + this._cleanTime());
                } else {
                    console.log('playing ' + this._cleanTime())
                };
                break;
            case window['YT'].PlayerState.PAUSED:
                if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
                    console.log('paused' + ' @ ' + this._cleanTime());
                };
                break;
            case window['YT'].PlayerState.ENDED:
                break;
        };
    };



    private _cleanTime(): number {
        this._videoId = this._parseYoutubeUrl(this.postType.value);
        return Math.round(this.player.getCurrentTime())
    };

    private _onPlayerError(event): void {
        switch (event.data) {
            case 2:
                break;
            case 100:
                break;
            case 101 || 150:
                break;
        };
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
                        console.log(data);
                        // fileName = 'http://annaniks.com:6262/media/' + data.file_name;
                        fileName = 'http://annaniks.com:6262/media/' + data.file_name;
                        this.contentFileName = data.file_name;
                        this.videoTumble = 'http://annaniks.com:6262/media/vido_tumbl/' + data.file_name_tumbl;
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

    public addEmoji($event): void {
        let data = this.postType.value + $event.emoji.native;
        this.postType.patchValue(data)

    }

    public showEmoji(): void {
        this.showemoji = !this.showemoji;
    }

    ////blur-i jamanak youtube-i video linke cuyc tal
    public hidePost(): void {
        this._videoId = this._parseYoutubeUrl(this.postType.value);
        if (this._videoId) {
            this._initPlayer();
        }
        else {
            this._destroyYoutubePlayer();
        }
        console.log(this.uploadType, this.postType.value);
    }
    ///////youtube-i video link
    private _destroyYoutubePlayer(): void {
        if (this.player) {
            this.player.stopVideo();
            this.player.destroy();
            this.player = null;
        }
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


    public setServiceVideo(event, type) {
        this.uploadType = 'video';
        this._setFormDataForImage(event);
        if (this.player) {
            this.player.stopVideo();
            this.player.destroy();
        }
        this.player = null;
    }


    public closeControlItem(): void {
        this.uploadType = null;
        console.log(this.uploadType);
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

        }).subscribe((data) => {
            this.loading = false;
            this.postType.patchValue('');
            this.uploadType = null;
            this.controImageItem = '';
            this.controVideoItem = '';
            this.isModalMode = false;
            if (this.player) {
                this.player.stopVideo();
                this.player.destroy();
                this.player = null;
            }

            this._postCreateEvent.emit();
            console.log(data, 1);

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
        this.player.stopVideo();
        this.player.destroy();
        this.player = null;
    }


}



























