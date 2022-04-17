import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `<input
    type="text"
    class="form-control"
    [(ngModel)]="value"
    id="{{ controlName }}"
    (focus)="onFocus()"
    (change)="onChangeInput($event, value)"
    (keyup)="onKey($event, value)"
    [disabled]="disabled"
    placeholder="{{ 'Enter your ' + controlName + '...' }}"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: InputComponent },
    // { provide: NG_VALIDATORS, multi: true, useExisting: InputComponent },
  ],
})
export class InputComponent implements ControlValueAccessor {
  // Validator
  @Input() controlName: string;
  value: any;
  disabled = false;
  onChange = (value: any) => {};
  onTouched = () => {};
  // onValidatorChange = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  onFocus() {
    this.onTouched();
  }

  onChangeInput(event, value) {
    this.onChange(value);
  }

  onKey(event, value) {
    this.onChange(value);
  }

  writeValue(value: any) {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  // validate(control: AbstractControl): ValidationErrors {
  //   console.log(control, 'control');
  //   const formControl = (control as FormControl).errors;
  //   console.log(control, 'formControl');
  //   const value = control.value;
  //   if (!value && control.touched) {
  //     return { required: true };
  //   } else if (formControl && formControl.email) {
  //     return { emailError: true };
  //   } else if (formControl && formControl.pattern) {
  //     return { patternError: true };
  //   } else if (formControl && formControl.minlength) {
  //     return { minLengthError: true };
  //   } else if (formControl && formControl.maxlength) {
  //     return { maxLengthError: true };
  //   }
  //   return null;
  // }

  // registerOnValidatorChange(onValidatorChange: () => void) {
  //   this.onValidatorChange = onValidatorChange;
  // }
}
