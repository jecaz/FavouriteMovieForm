import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from '../../shared/card/card.module';
import { MovieFormModule } from '../movie-form/movie-form.module';
import { ThankYouComponent } from './thank-you.component';

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
  ],
  exports: [ThankYouComponent],
})
export class ThankYouModule {}
