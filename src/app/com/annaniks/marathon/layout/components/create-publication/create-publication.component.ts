import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { RecipeResponseData, UploadFileResponse } from '../../../core/models';

@Component({
    selector: "app-create-publication",
    templateUrl: "create-publication.component.html",
    styleUrls: ["create-publication.component.scss"]
})

export class CreatePublicationComponent implements OnInit {
    public uploadType: string;
    public postType = new FormControl('');
    public post: boolean = false;
    public showemoji: boolean = false;
    public controImageItem: string="";
    public controVideoItem: string="";

    @Input() postItem: RecipeResponseData[];

    @ViewChild('inputImageReference') private _inputImageReference:ElementRef;
    @ViewChild('inputVideoReference') private _inputVideoReference:ElementRef;

    constructor(public _userService: UserService) { }

    ngOnInit() { }


    public showPost(): void {
        this.post = true;
    }
    public hidePost(): void {
        if (this.postType.value === '' || this.postType.value === null && this.uploadType === '') {
            this.post = false;
        }
    }

    private _setFormDataForImage(image) {
        let fileName: string;
        if (image && image.target) {
            const formData = new FormData();
            let fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                formData.append('file', file, file.name);
                this._userService.uploadVideoFile(formData)
                    .subscribe((data:UploadFileResponse) => {
                        console.log(data);
                        fileName='http://annaniks.com:6262/media/'+data.file_name;
                        if (this.uploadType === 'image') {
                            this.resetImageUplaodInput()
                            this.controImageItem = fileName;
                        }
                        else if (this.uploadType === 'video') {
                            this.resetVideoUplaodInput()
                            this.controVideoItem = fileName;
                        }
                        this.post = true;
                        console.log(this.uploadType);
                    })
            }
        }
    }


    private resetImageUplaodInput() :void{
        this._inputImageReference.nativeElement.value = ''
    }

    private resetVideoUplaodInput() :void{
        this._inputVideoReference.nativeElement.value = ''
    }

    public addEmoji($event): void {
        let data = this.postType.value + $event.emoji.native;
        this.postType.patchValue(data)

    }

    public showEmoji(): void {
        this.post = true;
        this.showemoji = !this.showemoji;
    }

    public createdPost(): void {

        this.postItem.push(
            {
                img: this.controImageItem,
                title: this.postType.value,
                video: this.controVideoItem
            }
        )

        this.post = false;
        this.postType.patchValue('');
        this.uploadType = null;
        this.controImageItem='';
        this.controVideoItem='';
        console.log(this.controImageItem,"image",this.controVideoItem,"video");
        
    }


    public setServicePhoto(event, type) {
        if (type === 'image') {
            this.uploadType = 'image';
        }
        else {
            this.uploadType = 'video';
        }

        this._setFormDataForImage(event);
    }


    public setServiceVideo(event) {
        this.uploadType = 'video';
        this._setFormDataForImage(event);
    }


    public closeControlItem(): void {
        this.uploadType = null;
        console.log(this.uploadType);

        if (this.postType.value === '' || this.postType.value === null) {
            this.post = false;
        }

    }
}




























