import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Unsubscribe } from '../../../utils/unsubscribe';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'control-error',
  templateUrl: './control-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent extends Unsubscribe {
  @Input()
  control: FormControl;
  errorMessage$ = new BehaviorSubject<string>('');
}
