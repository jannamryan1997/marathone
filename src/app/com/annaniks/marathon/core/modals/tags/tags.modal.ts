import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tags-modal',
  templateUrl: 'tags.modal.html',
  styleUrls: ['tags.modal.scss']
})
export class TagsModalComponent {
  public selectable: boolean = true;
  public selectedOffers: any[] = [];
  public tags;
  public activeItem;
  public selectedItem;
  public youtubeMaxContent = 10;
  constructor(@Inject(MAT_DIALOG_DATA) private _data, private _dialogRef: MatDialogRef<TagsModalComponent>) {
    this.tags = this._data.data;
    this.activeItem = this._data.activeItem;
  }


  ngOnInit() {
    if (this.activeItem) {
      for (let item of this.activeItem) {
        this.selectedItem = item;
        for (let item of this.tags) {
          for (let tag of item.tags) {
            if (this.selectedItem.toLowerCase() === tag.toLowerCase()) {
              if (this.selectedOffers.indexOf(this.selectedItem.toLowerCase()) == -1) {                
                this.selectedOffers.push(this.selectedItem);
              }
              
            }
          }
        }
      }
    }   
    
  }

  public showMoreOrLess(max: string, array) {

    if (this[max] < array.length) {
      this[max] = array.length;
    } else {
      this[max] = 10
    }
  }
  public closeModal(): void {
    this._dialogRef.close();
  }

  isSelected(offer: any): boolean {
    const index = this.selectedOffers.indexOf(offer);
    return index >= 0;
  }

  toggleOffer(offer: any): void {
    let index = this.selectedOffers.indexOf(offer);
    if (index >= 0) {
      this.selectedOffers.splice(index, 1);
    } else {
      this.selectedOffers.push(offer);
    }

  }


  public sentselectedOffers(): void {
    this._dialogRef.close(this.selectedOffers);

  }


  ngOnDestroy() { }
}