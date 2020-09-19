import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, Inject, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { UploadFileResponse, FeedResponseData } from '../../../core/models';
import { FeedService } from '../../../pages/main/feed/feed.service';
import { CookieService } from 'ngx-cookie';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { YoutubeService } from '../../../core/services/youtube.service';
import { MatDialog } from '@angular/material/dialog';
import { SpecialtiesModal, TagsModalComponent } from '../../../core/modals';
import { CountryService } from '../../../core/services/country.service';

@Component({
    selector: "app-create-publication",
    templateUrl: "create-publication.component.html",
    styleUrls: ["create-publication.component.scss"]
})


export class CreatePublicationComponent implements OnInit {
    public videoGroup: FormGroup;
    public videoTitle: string;
    public videoPleyer: boolean = true;
    public i18n;
    public languages = [];
    public filteredLanguages = [];
    public allLanguages = []
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
    private _youtubeLink: string;
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
    public mediaContent;
    @ViewChild('autocomplete') private _autocomplete;
    constructor(
        public _userService: UserService,
        private _feedService: FeedService,
        private _cookieServie: CookieService,
        private _fb: FormBuilder,
        private _countryService: CountryService,
        private _dialog: MatDialog,
        private _youtubeService: YoutubeService,
        @Inject("FILE_URL") private _fileUrl,
    ) {
    }

    ngOnInit() {
        this._initVideoGroup()
        if (this.editProfile) {
            this._getFeedById();
        } else {
            this.loading = true;
            this._getLanguages();
        }
        this._autosize();
        this._initi18n();
        this._setPatchValue();

    }

    private _initVideoGroup() {
        this.videoGroup = this._fb.group({
            title: [null],
            tags: [],
            languages: [],
            defaultTags: []

        })
        this.videoGroup.get('languages').valueChanges.pipe(takeUntil(this._unsbscribe)).subscribe((val) => {
            this.filterCountryMultiple(' ', this._autocomplete)
        })
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
    public formatDefaultTags(defaultTags) {
        let completeTags = ''
        if (defaultTags && defaultTags.length) {
            for (let i = 0; i < defaultTags.length; i++) {
                if (i < 5)
                    completeTags += `#${defaultTags[i]} `
            }
        }
        return completeTags
    }
    public filterCountryMultiple(event, autocomplete?): void {

        let query = event ? event.query : null;
        this.filteredLanguages = this.filterCountry(query, this.allLanguages, autocomplete)
    }

    public filterCountry(query: string, languages, autocomplete?) {
        let filtered: any[] = [];

        for (let item of languages) {
            if (query) {
                if (item.name.toLowerCase().includes(query.toLowerCase().trim())) {
                    if ((this.videoGroup.get('languages').value && this.videoGroup.get('languages').value !== item) || !this.videoGroup.get('languages').value)
                        filtered.push(item);
                }
            } else {

                if ((this.videoGroup.get('languages').value && this.videoGroup.get('languages').value !== item) || !this.videoGroup.get('languages').value)
                    filtered.push(item);

            }
        }

        if (autocomplete)
            autocomplete.show();
        return filtered;
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
        this.loading = true;
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
                    this._getLanguages();
                    if (this.mediaContent.isShowVideo) {
                        this.videoGroup.patchValue({
                            title: this.mediaContent.title,
                            tags: this.mediaContent.tags,
                        })
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
        let content =
        {
            url: this.contentFileName,
            type: this.uploadType,
            videoTitle: this.videoTitle,
            title: this.videoGroup.get('title').value,

        }

        if (this.showYoutube) {
            content['title'] = this.videoGroup.get('title').value;
            content['tags'] = this.videoGroup.get('tags').value;
            content['languages'] = this.videoGroup.get('languages').value
            content['isShowVideo'] = true
        } else {
            content['isShowVideo'] = false
        }
        let role: string = this._cookieServie.get('role');
        if (!this.editProfile) {
            this._userService.postFeed({
                title: this.postType.value,
                content: JSON.stringify(content),
                role: role,
                is_public: true
            })
                .pipe(
                    takeUntil((this._unsbscribe)),
                    finalize(() => {
                        this.loading = false;
                        this.postType.patchValue('');
                        this.videoGroup.reset();
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
            let content =
            {
                url: this.contentFileName,
                type: this.uploadType,
                videoTitle: this.videoTitle,
            }

            if (this.showYoutube) {
                content['title'] = this.videoGroup.get('title').value;
                content['tags'] = this.videoGroup.get('tags').value;
                content['languages'] = this.videoGroup.get('languages').value
                content['isShowVideo'] = true
            } else {
                content['isShowVideo'] = false
            }
            this._feedService.updateFeedById(this.mediaUrl,
                {
                    title: this.postType.value,
                    content: JSON.stringify(content),
                    role: role,
                    is_public: true,


                })
                .pipe(
                    takeUntil((this._unsbscribe)),
                    finalize(() => {
                        this.closeEditModal.emit(true);
                        this.loading = false;
                        this.postType.patchValue('');
                        this.videoGroup.reset();
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
        this.videoGroup.reset();
        this.uploadType = null;
        this.controImageItem = '';
        this.controVideoItem = '';
        this.showYoutube = false;
        this.player = null;
        this.showemoji = false;
        this.videoPleyer = true;
        this.closeEditModal.emit(false);

    }

    public play(): void {        
        if (this.postType.value.indexOf('https://www.youtube.com') > -1) {
            let youtubeIndex = this.postType.value.indexOf('https://www.youtube.com');
            let spaceIndex = this.postType.value.indexOf(' ', youtubeIndex + 1);
            if(spaceIndex == -1){
                spaceIndex=this.postType.value.length
            }            
            let youtubeLink = spaceIndex > -1 ? this.postType.value.slice(youtubeIndex, spaceIndex).trim() : this.postType.value;
            if (youtubeLink && youtubeLink !== this._youtubeLink) {
                this.videoPleyer = true;
                this._youtubeLink=youtubeLink;                
            }           
            if (this.videoPleyer) {        
                this.videoSources = [{
                    src: this._youtubeLink,
                    provider: 'youtube',
                }]

                this.showYoutube = true;
                this._youtubeService.getVideosForChanel(this.postType.value).subscribe((data: any) => {
                    let tagsArray = [];

                    if (data.items && data.items[0] && data.items[0].snippet) {
                        if (data.items[0].snippet.tags)
                            for (let tag of data.items[0].snippet.tags) {
                                tagsArray.push(tag)
                            }
                        this.videoGroup.patchValue({
                            defaultTags: tagsArray
                        })
                        if (!this.editProfile) {
                            this.videoGroup.patchValue({
                                title: data.items[0].snippet.title,
                                languages: data.items[0].snippet.defaultAudioLanguage ? this.languages[data.items[0].snippet.defaultAudioLanguage.toLowerCase()] ? this.languages[data.items[0].snippet.defaultAudioLanguage.toLowerCase()] : null : null
                            })
                        }
                    }
                })

                this.contentFileName = this.postType.value,
                    this.uploadType = 'videoLink'
                this.videoPleyer = false;
            }
        } else {
            this._youtubeLink=null;
            this.videoSources = [];
            this.videoGroup.reset();
            this.showYoutube = false;
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
    private _getLanguages(): void {


        this._countryService.getAllLanguages()
            .pipe(takeUntil(this._unsbscribe))
            .subscribe((lng) => {
                this.languages = lng
                let keys = Object.values(lng);
                this.filteredLanguages = keys;
                this.allLanguages = keys;
                if (this.editProfile) {
                    let languagesArray = [];

                    if (this.mediaContent && this.mediaContent.languages) {
                        for (let lng of this.mediaContent.languages) {
                            let select = this.filteredLanguages.filter((data) => {
                                return data.name == lng.name
                            })

                            if (select && select.length) {
                                languagesArray.push(select[0])
                            }
                        }

                        if (this.mediaContent.isShowVideo) {

                            this.videoGroup.patchValue({
                                languages: languagesArray
                            })
                        }
                    }
                }
                this.loading = false;
            });
    }
    public closeVideo(): void {

        this.videoPleyer = false;
        this.postType.patchValue('');
        this.videoGroup.reset();
        this.videoTitle = '';
        setTimeout(() => {
            this.showYoutube = false;
        }, 200);

    }
    public openSelectTagsModal(): void {

        const dialogRef = this._dialog.open(TagsModalComponent, {
            width: "520px",
            maxHeight: '57vh',
            panelClass: 'tags-modal',
            data: {
                data: this.videoGroup.get('defaultTags').value,
                activeItem: this.videoGroup.get('tags').value,
                type: 'tags',
                title: 'Select video Tags'
            }
        })
        dialogRef.afterClosed().pipe(takeUntil(this._unsbscribe)).subscribe((data) => {
            if (data) {
                this.videoGroup.patchValue({
                    tags: data,
                })
            }


        })
    }

    public openLanguagesModal(): void {
        const dialogRef = this._dialog.open(SpecialtiesModal, {
            width: "520px",
            maxHeight: '57vh',
            data: {
                data: this.filteredLanguages,
                activeItem: this.videoGroup.get('languages').value,
                title: 'Select language'
            }
        })
        dialogRef.afterClosed().pipe(takeUntil(this._unsbscribe)).subscribe((data) => {
            if (data) {
                this.videoGroup.patchValue({
                    languages: data,
                })
            }
        })
    }
    ngOnDestroy() {
        this._unsbscribe.next()
        this._unsbscribe.complete();
    }

}