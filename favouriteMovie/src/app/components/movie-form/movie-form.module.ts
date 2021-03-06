import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../../shared/select/select.module';
import { ButtonModule } from '../../shared/button/button.module';
import { CardModule } from '../../shared/card/card.module';
import { InputModule } from '../../shared/input/input.module';
import { MovieFormComponent } from './movie-form.component';

@NgModule({
  declarations: [MovieFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputModule,
    SelectModule,
    ButtonModule,
  ],
  providers: [],
  exports: [MovieFormComponent],
})
export class MovieFormModule {}
