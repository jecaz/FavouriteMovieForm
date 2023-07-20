import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValueAccessor } from '../../models/value-accessor.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends ValueAccessor {
  @Input() controlName: string;
}
