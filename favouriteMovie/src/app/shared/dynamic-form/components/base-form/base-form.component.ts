import { FormConfig } from '../../../../models/form-config';
import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({ template: '' })
export class BaseFormComponent implements OnInit {
  @HostBinding('class')
  hostFormFieldClass: string;
  config: FormConfig;
  group: FormGroup;

  ngOnInit() {
    this.hostFormFieldClass = (this.config?.gridClass ?? 'col-12 ') + this.config?.cssClass;
  }
}
