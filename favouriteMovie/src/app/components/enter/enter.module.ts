import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../card/card.module';
import { EnterComponent } from './enter.component';

@NgModule({
  declarations: [EnterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardModule],
  providers: [],
  exports: [EnterComponent],
})
export class EnterModule {}
