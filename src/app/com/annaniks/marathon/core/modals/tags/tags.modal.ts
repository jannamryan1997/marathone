import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { FilterTag } from '../../models/tags.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-tags-modal',
  templateUrl: 'tags.modal.html',
  styleUrls: ['tags.modal.scss']
})
export class TagsModalComponent {
  public searchControl = this._fb.control(null, Validators.required)
  public selectable: boolean = true;
  public selectedOffers: any[] = [];
  public tags: FilterTag[];
  public activeItem: string[];
  private unsubscribe$ = new Subject<void>();
  public selectedItem: string;
  public youtubeMaxContent = 10;
  constructor(@Inject(MAT_DIALOG_DATA) private _data,
    private _youtubeService: YoutubeService,
    private _dialogRef: MatDialogRef<TagsModalComponent>,
    private _fb: FormBuilder) {
    this.tags = this._data.data;
    this.activeItem = this._data.activeItem;
  }


  ngOnInit() {
    this._setActiveItem()
  }

  private _setActiveItem() {
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

  public search() {
    if (this.searchControl.valid) {
      let youtubeArr;
      let youtubeTags = this.tags.filter((data) => { return data.type == 'youtube' });
      if (youtubeTags && youtubeTags.length) {
        if (youtubeTags[0].tags) {
          youtubeArr = youtubeTags[0].tags.toString();
        }
      }
      // this._youtubeService.filterTags(this.searchControl.value, youtubeArr).pipe(takeUntil(this.unsubscribe$)
      //   // ,switchMap((data)=>{
      //   //   return  this._youtubeService.getAllTagsCategories().pipe(
      //   //     map((categories)=>{

      //   //     })
      //   //   )
      //   // })
      // ).subscribe((data) => {
      //   console.log(data);

      // })

      ///////
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


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}