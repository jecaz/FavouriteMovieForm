import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `<input
    [formControl]="formControl"
    [type]="'text'"
    class="form-control"
    id="{{ controlName }}"
    placeholder="{{ 'Enter your ' + controlName + '...' }}"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() set control(value: FormControl) {
    if (this.formControl !== value) {
      this.formControl = value;
    }
  }
  @Input() type: string;
  @Input() controlName: string;
  formControl: FormControl;
}
