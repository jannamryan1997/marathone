import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: "app-preparation-step",
  templateUrl: "preparation-step.component.html",
  styleUrls: ["preparation-step.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreparationStepComponent),
      multi: true
    }
  ]
})

export class PreparationStepComponent implements OnInit, ControlValueAccessor {
  @Input() index: number;
  public stepControl: FormControl = new FormControl();

  constructor() { }

  onChange: any = () => { }
  onTouch: any = () => { }

  private _handleControlChanges(): void {
    this.stepControl.valueChanges.subscribe((value) => {
      this.onChange({ title: value })
    })
  }

  ngOnInit() { 
    this._handleControlChanges();
  }


  writeValue(val: any) {
    this.stepControl.patchValue(val);
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

}