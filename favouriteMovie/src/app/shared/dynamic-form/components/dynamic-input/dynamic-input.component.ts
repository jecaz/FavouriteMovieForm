import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'dynamic-input',
  templateUrl: './dynamic-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInputComponent extends BaseFormComponent {}
