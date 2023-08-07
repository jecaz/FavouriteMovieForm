import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../../shared/card/card.module';
import { EnterComponent } from './enter.component';
import { MovieFormModule } from '../movie-form/movie-form.module';
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module';
import { CountryService } from '../../services/country.service';

@NgModule({
  declarations: [EnterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    MovieFormModule,
    DynamicFormModule
  ],
  providers: [CountryService],
  exports: [EnterComponent],
})
export class EnterModule {}
