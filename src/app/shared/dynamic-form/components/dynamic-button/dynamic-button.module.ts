import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicButtonComponent } from './dynamic-button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DynamicButtonComponent],
})
export class DynamicButtonModule {}
