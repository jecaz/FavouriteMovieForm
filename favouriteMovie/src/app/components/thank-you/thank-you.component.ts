import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MOVIE_KEY } from 'src/app/models/movie.enum';
import { FavouriteMovie } from '../../models/favourite-movie.model';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThankYouComponent implements OnInit {
  favouriteMovie: FavouriteMovie;
  movieKyes = MOVIE_KEY;

  constructor() {}

  ngOnInit(): void {
    this.favouriteMovie = JSON.parse(localStorage.getItem('favouriteMovie'));
  }
}
