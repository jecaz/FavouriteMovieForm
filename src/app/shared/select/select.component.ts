import { Component, Input } from '@angular/core';
import { DropdownMenu } from 'src/app/models/dropdown.model';
import { ValueAccessor } from '../../models/value-accessor.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends ValueAccessor {
  @Input() options: DropdownMenu[];
  @Input() controlName: string;
}
