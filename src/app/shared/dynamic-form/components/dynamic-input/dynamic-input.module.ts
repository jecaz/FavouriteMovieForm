import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicInputComponent } from './dynamic-input.component';

@NgModule({
  declarations: [DynamicInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DynamicInputComponent],
})
export class DynamicInputModule {}
