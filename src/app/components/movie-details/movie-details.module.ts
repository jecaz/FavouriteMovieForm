import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details.component';
import { CardModule } from '../../shared/card/card.module';
import { StarRatingModule } from '../../shared/star-rating/star-rating.module';

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [CommonModule, CardModule, StarRatingModule],
  exports: [MovieDetailsComponent],
})
export class MovieDetailsModule {}
