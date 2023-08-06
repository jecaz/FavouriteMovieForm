import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormService } from '../../service/form.service';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'dynamic-button',
  templateUrl: './dynamic-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicButtonComponent extends BaseFormComponent {

  constructor(readonly formService: FormService) {
    super();
  }
}
