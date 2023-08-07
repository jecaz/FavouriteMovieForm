import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormConfig } from '../../../models/form-config';

@Injectable()
export class FormService {
  private disabledButtonSource$ = new BehaviorSubject<boolean>(false);

  private formChangedSource$ = new BehaviorSubject<FormGroup | null>(null);

  private autocompleteOptionsSource$ = new BehaviorSubject<string[] | null>(null);

  readonly disabledButton$ = this.disabledButtonSource$.asObservable();

  readonly formChanged$ = this.formChangedSource$.asObservable();

  readonly autocompleteOptions$ =
    this.autocompleteOptionsSource$.asObservable();

constructor(private readonly fb: FormBuilder) {}

  disableSubmitButton(disabled: boolean): void {
    this.disabledButtonSource$.next(disabled);
  }

  hasFormChanged(form: FormGroup): void {
    this.formChangedSource$.next(form);
  }

  setAutocompletedOption(options: string[]): void {
    this.autocompleteOptionsSource$.next(options);
  }

  getFormControl(form: FormGroup, controlName: string): FormControl {
    return form.controls[controlName] as FormControl;
  }

  setValue(form: FormGroup, name: string, value: unknown): void {
    // form.controls[name].setValue(value, { emitEvent: true });
    form.controls[name].setValue(value);
  }

  configControls(config: FormConfig[]): FormConfig[] {
    return config.filter(({ fieldType }) => fieldType !== 'button');
  }

  createFormGroup(config: FormConfig[]): FormGroup {
    const group = this.fb.group({});
    this.configControls(config).forEach((control) =>
      group.addControl(
        control.name,
        this.createFormControl(control)
      )
    );
    return group;
  }

  createFormControl(config: FormConfig): FormControl {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
    // return this.fb.control({ disabled, value }, { updateOn:  'blur', validators: validation });
  }

  setDisabled(
    form: FormGroup,
    config: FormConfig[],
    name: string,
    disable: boolean
  ): void {
    if (form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      form.controls[name][method]();
      return;
    }

    config = this.configControls(config).map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }
}
