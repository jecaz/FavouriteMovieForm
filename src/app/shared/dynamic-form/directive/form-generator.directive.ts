import { FormConfig } from 'src/app/models/form-config';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicButtonComponent } from '../components/dynamic-button/dynamic-button.component';
import { DynamicInputComponent } from '../components/dynamic-input/dynamic-input.component';
import { DynamicSelectComponent } from '../components/dynamic-select /dynamic-select.component';
import { BaseFormComponent } from '../components/base-form/base-form.component';
import { DynamicAutocompleteListComponent } from '../components/dynamic-autocomplete-list/dynamic-autocomplete-list.component';

const components: { [type: string]: Type<BaseFormComponent> } = {
  button: DynamicButtonComponent,
  input: DynamicInputComponent,
  select: DynamicSelectComponent,
  autocompleteList: DynamicAutocompleteListComponent,
};

@Directive({
  selector: '[formGenerator]',
})
export class FormGeneratorDirective implements OnChanges, OnInit {
  @Input()
  config: FormConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<BaseFormComponent>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.fieldType]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.fieldType}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<BaseFormComponent>(
      components[this.config.fieldType]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
