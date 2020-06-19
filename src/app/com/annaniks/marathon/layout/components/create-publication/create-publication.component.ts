import { Component, OnInit, Input, AfterViewChecked } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: "app-create-publication",
    templateUrl: "create-publication.component.html",
    styleUrls: ["create-publication.component.scss"]
})

export class CreatePublicationComponent implements OnInit {

    public postType = new FormControl('');
    public post: boolean = false;
    public showImage: boolean = false;
    public showemoji:boolean=false;
    public contentImageItem: string;

    @Input() postItem;

    constructor() { }

    ngOnInit() { }


    public showPost(): void {
        this.post = true;
    }
    public hidePost(): void {
        if (this.postType.value ==='' || this.postType.value ===null  && this.showImage === false) {
            this.post = false;
        }
    }
    public setServicePhoto(event): void {
        if (event) {
            this.showImage = true;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.contentImageItem = e.target.result;
            };
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }
            this.showImage = true;
            this.post = true;
        }
    }

    addEmoji($event) {
        let data = this.postType.value+ $event.emoji.native;
        this.postType.patchValue(data)
        
    }

    public showEmoji(): void {
        this.post=true;
        this.showemoji = !this.showemoji;
    }

    public createdPost(): void {
        this.postItem.push(
            {
                img: this.contentImageItem,
                title:this.postType.value,
            }
        )
   
this.post=false;
this.postType.patchValue('');
this.showImage=false;

    }

}




























