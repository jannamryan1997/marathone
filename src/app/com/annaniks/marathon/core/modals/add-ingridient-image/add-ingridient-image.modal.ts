import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Slider, UploadFileResponse } from '../../models';
import { UserService } from '../../services/user.service';

@Component({
  selector: "add-ingridient-image",
  templateUrl: "add-ingridient-image.modal.html",
  styleUrls: ["add-ingridient-image.modal.scss"]
})

export class AddIngridientImageModal implements OnInit {
  slides: Slider[];

  slideConfig = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data,
    @Inject('FILE_URL') private _fileUrl,
    private _matDialogRf: MatDialogRef<AddIngridientImageModal>,
    private _userService: UserService,
  ) {
    if (_data && _data.data) {
      this.slides = this._data.data;
    }


    this.slideConfig = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      autoplay: true,
      autoplaySpeed: 2000
    }
  }

  ngOnInit() { }

  public closeModal(): void {
    this._matDialogRf.close();
  }



  public setServicePhoto(image): void {
    if (image && image.target) {
      const formData = new FormData();
      let fileList: FileList = image.target.files;
      if (fileList.length > 0) {
        let file: File = fileList[0];
        formData.append('file', file, file.name);

        this._userService.uploadVideoFile(formData)
          .subscribe((data: UploadFileResponse) => {
            this.slides.push({ img: this._fileUrl + data.file_name });

          })
      }
    }
  }






  public removeRecipeImageItem(event, ind): void {
    if (event) {
      this.slides.splice(ind, 1);
      if (this.slides.length === 0) {
        this._matDialogRf.close('closeAfterrRemove');
      }
    }
  }

}