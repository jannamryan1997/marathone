import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "add-ingridient-image",
    templateUrl: "add-ingridient-image.modal.html",
    styleUrls: ["add-ingridient-image.modal.scss"]
})

export class AddIngridientImageModal implements OnInit {
    slides = [
        {img: "assets/images/food.png"},
        {img: "/assets/images/foodimg.png"},
        {img: "assets/images/food.png"},
        {img: "/assets/images/foodimg.png"}
      ];

      slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
    constructor(private _matDialogRf: MatDialogRef<AddIngridientImageModal>) { }

    ngOnInit() { }

    public closeModal(): void {
        this._matDialogRf.close();
    }
  
      slickInit(e) {
        console.log('slick initialized');
      }
      
      breakpoint(e) {
        console.log('breakpoint');
      }
      
      afterChange(e) {
        console.log('afterChange');
      }
      
      beforeChange(e) {
        console.log('beforeChange');
      }
}