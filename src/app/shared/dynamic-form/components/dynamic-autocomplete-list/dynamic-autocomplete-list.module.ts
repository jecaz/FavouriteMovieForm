import { DynamicInputModule } from './../dynamic-input/dynamic-input.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicAutocompleteListComponent } from './dynamic-autocomplete-list.component';

@NgModule({
  declarations: [DynamicAutocompleteListComponent],
  imports: [CommonModule, ReactiveFormsModule, DynamicInputModule],
  exports: [DynamicAutocompleteListComponent],
})
export class DynamicAutocompleteListModule {}
