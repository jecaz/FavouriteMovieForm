import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent {
  @Input() movie: Movie;
  starRatingVisible = false;

  toggleStarRating() {
    this.starRatingVisible = !this.starRatingVisible;
  }

  closeStarRating(event) {
    this.starRatingVisible = event;
  }
}
