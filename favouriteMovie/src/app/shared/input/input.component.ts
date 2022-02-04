import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `<input
    [formControl]="formControl"
    type="text"
    class="form-control"
    id="{{ controlName }}"
    placeholder="{{ 'Enter your ' + controlName + '...' }}"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() set control(value: AbstractControl) {
    if (this.formControl !== value) {
      this.formControl = value as FormControl;
    }
  }
  @Input() type: string;
  @Input() controlName: string;
  formControl: FormControl;
}
