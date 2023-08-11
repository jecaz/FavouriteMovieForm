import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavouriteMovie } from '../../models/favourite-movie.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { HttpRequestState, Movie } from '../../models/movie.model';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoadingService],
})
export class ThankYouComponent implements OnInit {
  movieForm: FormGroup;
  movieDetails$: Observable<HttpRequestState<Movie>>;
  showDetails = false;

  constructor(
    protected movieService: MovieService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const movie: FavouriteMovie = JSON.parse(
      sessionStorage.getItem('favouriteMovie')
    );
    if (movie) {
      this.movieForm = new FormGroup({});
      for (let label in movie) {
        this.movieForm.addControl(
          label,
          new FormControl({ value: movie[label], disabled: true })
        );
      }
    }
    this.movieDetails$ = this.getMovieByTitle(this.movieForm.controls.favouriteMovie.value);
  }

  showMovieDetails() {
    if (!this.movieForm.controls.favouriteMovie.value) {
      return;
    }
    this.showDetails = true;
  }

  getMovieByTitle(title: string): Observable<HttpRequestState<Movie>> {
    return this.movieService
      .getMoviesByTitle('movie', title)
      .pipe(
        switchMap((movies: Movie[]) => this.movieService.getMovieById(movies[0].imdbID)),
      );
  }
}
