import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Slider } from '../../models';

@Component({
  selector: "add-ingridient-image",
  templateUrl: "add-ingridient-image.modal.html",
  styleUrls: ["add-ingridient-image.modal.scss"]
})

export class AddIngridientImageModal implements OnInit {
  slides: Slider[];

  slideConfig = {};

  constructor(@Inject(MAT_DIALOG_DATA) private _data, private _matDialogRf: MatDialogRef<AddIngridientImageModal>) {
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


  public setServicePhoto(event): void {
    if (event) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.slides.push({ img: e.target.result });
      };
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
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