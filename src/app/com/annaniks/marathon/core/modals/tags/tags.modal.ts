import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ServerResponse } from '../../models';
import { Category, FilterTag, Tag } from '../../models/tags.model';
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
  private _allTags: FilterTag[];
  public activeItem: string[];
  private unsubscribe$ = new Subject<void>();
  public selectedItem: string;
  public youtubeMaxContent = 10;
  public isGet:boolean=false;
  constructor(@Inject(MAT_DIALOG_DATA) private _data,
    private _youtubeService: YoutubeService,
    private _dialogRef: MatDialogRef<TagsModalComponent>,
    private _fb: FormBuilder) {
    this.tags = this._data.data;
    this._allTags = this._data.data;
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
      this.isGet=false;
      let searchValue=this.searchControl.value;
      if(this.searchControl.value.trim().startsWith('#')){        
        searchValue=searchValue.substring(1);        
      }      
      this._youtubeService.filterTags(searchValue).pipe(takeUntil(this.unsubscribe$), switchMap((data: ServerResponse<Tag[]>) => {
        this.tags = []
        return this._youtubeService.getAllTagsCategories().pipe(
          map((categories: ServerResponse<Category[]>) => {
            let youtubeArr;
            let filterYoutubeArr = []
            let youtubeTags = this._allTags.filter((data) => { return data.type == 'youtube' });
            if (youtubeTags && youtubeTags.length) {
              if (youtubeTags[0].tags) {
                youtubeArr = youtubeTags[0].tags
              }
            }
            if (searchValue.toLowerCase().trim()) {
              filterYoutubeArr = youtubeArr.filter((data) => {
                return data.toLowerCase().trim() == searchValue.toLowerCase().trim()
              })
            } else {
              filterYoutubeArr = youtubeArr
            }

            if (filterYoutubeArr && filterYoutubeArr.length) {
              this.tags.push({ type: 'youtube', tags: filterYoutubeArr })
            }
            for (let category of categories.results) {
              let arr = [];
              for (let tag of data.results) {
                if (category.url == tag.category) {
                  arr.push(tag.name)
                }
              }
              if (arr && arr.length) {
                this.tags.push({ type: category.name, tags: arr })
              }
            }
            this.isGet=true;
          })
        )
        
      })
      ).subscribe()
    } else {
      this.tags = this._data.data;
      this.isGet=true;
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