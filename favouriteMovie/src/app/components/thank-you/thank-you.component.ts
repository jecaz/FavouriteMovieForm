import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavouriteMovie } from '../../models/favourite-movie.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
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
  loadedMovieDetails$: Observable<Movie>;

  constructor(
    protected movieService: MovieService,
    protected loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const movie: FavouriteMovie = JSON.parse(
      sessionStorage.getItem('favouriteMovie')
    );
    if (movie) {
      console.log(movie);
      this.movieForm = new FormGroup({});
      for (let label in movie) {
        this.movieForm.addControl(
          label,
          new FormControl({ value: movie[label], disabled: true })
        );
      }
    }
  }

  showMovieDetails() {
    if (!this.movieForm.controls.favouriteMovie.value) {
      return;
    }
    const movieDetails$: Observable<Movie> = this.movieService
      .getMoviesByTitle('movie', this.movieForm.controls.favouriteMovie.value)
      .pipe(
        switchMap((movies: Movie[]) => {
          return this.movieService.getMovieById(movies[0].imdbID);
        })
      );
    this.loadedMovieDetails$ =
      this.loadingService.showLoaderUntilCompleted(movieDetails$);
    // this.loadedMovieDetails$.subscribe((movie) => console.log(movie));
  }
}
