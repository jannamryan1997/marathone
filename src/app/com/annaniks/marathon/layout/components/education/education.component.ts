import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { EducationData } from '../../../core/models/user';

@Component({
    selector: "app-education",
    templateUrl: "education.component.html",
    styleUrls: ["education.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EducationComponent),
            multi: true
        }
    ]
})

export class EducationComponent implements OnInit {
    public educationFormGroup: FormGroup;
    @Input() education;
    @Input() educationItem:EducationData;
    @Input() profileEducation: boolean;
    @Output() deleted = new EventEmitter<any>();

    constructor(private _fb: FormBuilder) { }
    onChange: any = () => { }
    onTouch: any = () => { }

    ngOnInit() {
        this._formBuilder();
        this._handleControlChanges();
        
    }

    private _formBuilder(): void {
        this.educationFormGroup = this._fb.group({
            name: [null, Validators.required],
            specialization: [null, Validators.required],
            start_date: [null, Validators.required],
            end_date: [null, Validators.required]
        })
    }

    private _handleControlChanges(): void {
        this.educationFormGroup.valueChanges.subscribe((value) => {
            this.onChange(
                {
                    name: value.name,
                    specialization: value.specialization,
                    start_date: value.start_date,
                    end_date: value.end_date,
                }

            )
        })
    }


    writeValue(val: any) {
        this.educationFormGroup.patchValue(val);
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }

    public deleteEducationItem(): void {
        this.deleted.emit(true);
    }

}