import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Slider } from '../../models';

@Component({
  selector: "add-ingridient-image",
  templateUrl: "add-ingridient-image.modal.html",
  styleUrls: ["add-ingridient-image.modal.scss"]
})

export class AddIngridientImageModal implements OnInit {
  slides:Slider[];

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

  constructor(@Inject(MAT_DIALOG_DATA) private _data,private _matDialogRf: MatDialogRef<AddIngridientImageModal>) { 
    this.slides=this._data.data;
  }

  ngOnInit() { 
    console.log(this.slides);
    
  }

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

public removeRecipeImageItem(event,ind):void{
  if(event){
    this.slides.splice(ind,1);
    if(this.slides.length===0){
      this._matDialogRf.close('closeAfterrRemove');
    }
  }
}
  

  slickInit(e) {}

  breakpoint(e) {}

  afterChange(e) {}

  beforeChange(e) { }
}