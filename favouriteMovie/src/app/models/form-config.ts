import { ValidatorFn } from '@angular/forms';
import { DropdownMenu } from './dropdown.model';

export interface FormConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: DropdownMenu[];
  placeholder?: string;
  fieldType: string;
  validation?: ValidatorFn[];
  value?: unknown;
  readonly?: boolean;
  populatedValue?: unknown;
  hidden?: boolean;
  gridClass?: string;
  cssClass?: string;
}
