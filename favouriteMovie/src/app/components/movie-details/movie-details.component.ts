import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie: Movie;
  starRatingVisible = false;

  constructor() {}

  ngOnInit(): void {}

  toggleStarRating() {
    this.starRatingVisible = !this.starRatingVisible;
  }

  closeStarRating(event) {
    this.starRatingVisible = event;
  }
}
