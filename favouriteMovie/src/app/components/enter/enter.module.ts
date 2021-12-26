import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnterComponent } from './enter.component';

@NgModule({
  declarations: [EnterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  exports: [EnterComponent],
})
export class EnterModule {}
