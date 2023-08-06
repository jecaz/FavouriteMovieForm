import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { FormGeneratorDirective } from './directive/form-generator.directive';
import { DynamicButtonModule } from './components/dynamic-button/dynamic-button.module';
import { DynamicInputModule } from './components/dynamic-input/dynamic-input.module';
import { DynamicSelectModule } from './components/dynamic-select /dynamic-select.module';
import { FormService } from './service/form.service';
import { DynamicAutocompleteListModule } from './components/dynamic-autocomplete-list/dynamic-autocomplete-list.module';
import { ControlErrorModule } from './components/control-error/control-error.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicButtonModule,
    DynamicInputModule,
    DynamicSelectModule,
    DynamicAutocompleteListModule,
    ControlErrorModule
  ],
  declarations: [
    FormGeneratorDirective,
    DynamicFormComponent,
  ],
  providers: [FormService],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule {}
