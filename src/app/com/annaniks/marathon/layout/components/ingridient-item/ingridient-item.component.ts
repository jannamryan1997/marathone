import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: "app-ingridient-item",
    templateUrl: "ingridient-item.component.html",
    styleUrls: ["ingridient-item.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IngridientItemComponent),
            multi: true
        }
    ]
})

export class IngridientItemComponent implements OnInit {
    public ingridientFormGroup: FormGroup;
    @Input() titleItem;

    constructor(private _fb: FormBuilder) { }
    onChange: any = () => { }
    onTouch: any = () => { }
  


    ngOnInit() {
        this._formBuilder();
        this._handleControlChanges()
    }

    private _formBuilder(): void {
        this.ingridientFormGroup = this._fb.group({
            name: [null, Validators.required],
            value: [null, Validators.required]
        })
    }

    private _handleControlChanges(): void {
        this.ingridientFormGroup.valueChanges.subscribe((value) => {
          this.onChange( { name:value.name,value:value.value })
        })
      }
      

      writeValue(val: any) {
        this.ingridientFormGroup.patchValue(val);
      }

    registerOnChange(fn: any) {
        this.onChange = fn
      }
    
      registerOnTouched(fn: any) {
        this.onTouch = fn
      }

}