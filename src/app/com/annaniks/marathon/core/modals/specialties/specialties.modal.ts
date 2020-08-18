import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: "app-specialties",
  templateUrl: "specialties.modal.html",
  styleUrls: ["specialties.modal.scss"]
})

export class SpecialtiesModal implements OnInit, OnDestroy {
  public selectable: boolean = true;
  public selectedOffers: any[] = [];
  public speciality;
  public activeItem;
  public selectedItem;
  constructor(@Inject(MAT_DIALOG_DATA) private _data, private _dialogRef: MatDialogRef<SpecialtiesModal>) {
    this.speciality = this._data.data;
    this.activeItem = this._data.activeItem;
  }


  ngOnInit() {
    if (this.activeItem) {
      for (let item of this.activeItem) {
        this.selectedItem = item;
        for (let speciality of this.speciality) {
          if (item === speciality) {
            this.selectedOffers.push(this.selectedItem);

          }
        }
      }
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