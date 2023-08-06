import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from '../../service/form.service';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'dynamic-autocomplete-list',
  templateUrl: './dynamic-autocomplete-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicAutocompleteListComponent extends BaseFormComponent {
  isAutocompleteOpen = false;

  options$: Observable<string[]> = this.formService.autocompleteOptions$;

  constructor(protected readonly formService: FormService) {
    super();
  }

  selectOption(option: string): void {
    this.isAutocompleteOpen = false;
    this.group.controls[this.config.name].setValue(option);
  }
}
