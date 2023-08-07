import { Directive, HostListener, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

import type { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { ValueAccessor } from '../../models/value-accessor.model';

@Directive({
  selector: '[valueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ValueAccessorDirective,
      multi: true,
    },
  ],
})
export class ValueAccessorDirective implements ControlValueAccessor {
  @Input()
  formControlName: string;

  @Input()
  valueAccessor: ValueAccessor;

  onChange = (value: any) => {};

  onTouched = () => {};

  onValidatorChange = () => {};

  constructor(private readonly formGroupDirective: FormGroupDirective, private readonly changeDetector: ChangeDetectorRef) {}

  @HostListener('keyup', ['$event.target.value'])
  handleOnChange(value: unknown): void {
    this.valueAccessor.value = value;
    this.onChange(value);
  }

  @HostListener('change', ['$event.target.value'])
  handleOnClick(value: unknown): void {
    this.valueAccessor.value = value;
    this.onChange(value);
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent(): void {
    this.onTouched();
  }

  writeValue(value: unknown) {
    const controlValue = this.getControl()?.value || value;
    this.valueAccessor.value = controlValue;
    this.changeDetector.markForCheck();
  }

  registerOnChange(onChange: () => unknown) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => unknown) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.valueAccessor.disabled = disabled;
  }

  private getControl(): AbstractControl | null {
    return this.formGroupDirective.control.controls[this.formControlName];
  }
}
