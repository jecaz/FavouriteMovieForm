import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '../../shared/button/button.module';
import { CardModule } from '../../shared/card/card.module';
import { MovieFormModule } from '../movie-form/movie-form.module';
import { ThankYouComponent } from './thank-you.component';
import { MovieDetailsModule } from '../movie-details/movie-details.module';
import { LoadingModule } from '../../shared/loading/loading.module';
import { SpinnerModule } from 'src/app/shared/directives/spinner.module';

const routes: Routes = [
  {
    path: '',
    component: ThankYouComponent,
  },
];

@NgModule({
  declarations: [ThankYouComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CardModule,
    MovieFormModule,
    ButtonModule,
    LoadingModule,
    MovieDetailsModule,
    SpinnerModule,
  ],
  exports: [ThankYouComponent],
})
export class ThankYouModule {}
