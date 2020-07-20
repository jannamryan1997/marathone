import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ExperienceData } from '../../../core/models/user';


@Component({
    selector: "app-experience",
    templateUrl: "experience.component.html",
    styleUrls: ["experience.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ExperienceComponent),
            multi: true
        }
    ]
})
export class ExperienceComponent implements OnInit {
    public experianceFormGroup: FormGroup;
    @Input() profileExperience: boolean;
    @Input() experience;
     @Input() experienceItem: ExperienceData;
    @Output() deleted = new EventEmitter<any>()

    constructor(private _fb: FormBuilder) { }

    onChange: any = () => { }
    onTouch: any = () => { }

    ngOnInit() {
        this._formBuilder();
        this._handleControlChanges();
    }

    private _formBuilder(): void {
        this.experianceFormGroup = this._fb.group({
            name: [null, Validators.required],
            specialization: [null, Validators.required],
            start_date: [null, Validators.required],
            end_date: [null, Validators.required]
        })
    }

    private _handleControlChanges(): void {
        this.experianceFormGroup.valueChanges.subscribe((value) => {
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
        this.experianceFormGroup.patchValue(val);
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }



    public deleteExperiance(): void {
        this.deleted.emit(true);
    }
}