import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Slider } from '../../../core/models';
import { AddIngridientImageModal } from '../../../core/modals';

@Component({
    selector: "recipe-view",
    templateUrl: "recipe.view.html",
    styleUrls: ["recipe.view.scss"]
})

export class RecipeView implements OnInit {

    public showImage:boolean=false;
    public localImage: string;
   public  slides:Slider[]= [
        // {img: "assets/images/food.png"},
        // {img: "/assets/images/foodimg.png"},
        // {img: "assets/images/food.png"},
        // {img: "/assets/images/foodimg.png"}
      ];

      slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
    constructor(private _matDialog: MatDialog) { }

    ngOnInit() {
        if(this.slides.length){
        this.showImage=true;
        }
    }

    private _openAddIngridientImageModal(): void {
        const dialogRef = this._matDialog.open(AddIngridientImageModal, {
            width: "100%",
            maxWidth: "100vw",
        })
    }
   public  setServicePhoto(event): void {
        if (event) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.slides.push({img:e.target.result});
                this.slides.map((element,index)=>{
                
                    console.log(element,"element");
                })
            };
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
            }
            this.showImage=true;
            console.log(this.slides);
            
        }
    }

    public onClickOpenIngridientModal():void{
        this._openAddIngridientImageModal();
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