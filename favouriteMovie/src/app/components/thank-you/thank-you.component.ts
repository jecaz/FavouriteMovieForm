import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavouriteMovie } from '../../models/favourite-movie.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThankYouComponent implements OnInit {
  movieForm: FormGroup;

  ngOnInit(): void {
    const movie: FavouriteMovie = JSON.parse(
      localStorage.getItem('favouriteMovie')
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
  }
}
