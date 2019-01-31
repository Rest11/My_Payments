import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StringKeys } from '../../types/string-keys';
import { CommonComponent } from '../../classes/CommonComponent';
import { SubscriptionsContract } from "../../contracts/subscriptions.contract";

@Component({
    selector: 'checkbox-set',
    templateUrl: './checkbox-set.component.html',
    styleUrls: ['./checkbox-set.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CheckboxSetComponent,
            multi: true,
        },
    ],
})
export class CheckboxSetComponent extends CommonComponent implements OnChanges, ControlValueAccessor {
    @Input()
    public items: StringKeys<any>[] = [];

    @Input()
    public useAsValue = 'value';

    @Input()
    public useAsLabel = 'label';

    @Input()
    public useAsDisabled;

    public itemsForm: FormGroup;

    private writtenFormValue: string[];

    constructor (
        private readonly formBuilder: FormBuilder,
    ) {
        super();
    }

    public ngOnChanges () : void {
        if (!this.items) {
            this.items = [];
        }

        const formConfig: any = { };
        for (const item of this.items) {
            formConfig[item[this.useAsValue]] = false;
        }
        this.itemsForm = this.formBuilder.group(formConfig);

        if (this.useAsDisabled) {
            const disabledItems = this.items.filter((item) => item[this.useAsDisabled]);
            for (const item of disabledItems) {
                this.itemsForm.controls[item[this.useAsValue]].disable();
            }
        }

        this.tryToUpdateFormValue();

        this.updateSubscription(
            SubscriptionsContract.CheckBoxSet.INNER_FORM_UPDATED,
            this.itemsForm.valueChanges
                .subscribe((formValue: Object) => {
                    this.onChange(Object.keys(formValue).filter((formField) => !!formValue[formField]));
                }),
        );
    }

    public onChange: Function = () => { };
    public onTouched: Function = () => { };

    public registerOnChange (onChangeListener: Function) : void {
        this.onChange = onChangeListener;
    }

    public registerOnTouched (onTouchedListener: Function) : void {
        this.onTouched = onTouchedListener;
    }

    public writeValue (value: string[]) : void {
        this.writtenFormValue = value;

        this.tryToUpdateFormValue();
    }

    private tryToUpdateFormValue () : void {
        if (this.items.length && this.itemsForm && this.writtenFormValue) {
            for (const item of this.writtenFormValue) {
                if (this.itemsForm.controls[item]) {
                    this.itemsForm.controls[item].setValue(true);
                }
            }
        }
    }

    public toggleAll (event: Event) : void {
        const toggleInput: HTMLInputElement = event.target as HTMLInputElement;

        for (const controlName in this.itemsForm.controls) {
            if (this.itemsForm.controls.hasOwnProperty(controlName)) {
                if (this.itemsForm.controls[controlName].enabled) {
                    this.itemsForm.controls[controlName].setValue(toggleInput.checked);
                }
            }
        }
    }
}
