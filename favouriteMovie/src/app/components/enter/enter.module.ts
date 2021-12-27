import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../../shared/card/card.module';
import { EnterComponent } from './enter.component';
import { MovieFormModule } from '../movie-form/movie-form.module';

@NgModule({
  declarations: [EnterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    MovieFormModule,
  ],
  providers: [],
  exports: [EnterComponent],
})
export class EnterModule {}
