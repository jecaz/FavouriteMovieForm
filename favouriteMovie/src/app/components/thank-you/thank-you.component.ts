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
    this.initForm();
    this.movieForm.patchValue(
      JSON.parse(localStorage.getItem('favouriteMovie'))
    );
  }

  initForm() {
    this.movieForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      country: new FormControl(''),
      postCode: new FormControl(''),
      favouriteMovie: new FormControl(''),
    });
  }
}
