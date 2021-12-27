import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { DropdownMenu } from '../../models/dropdown.model';
import { Movie } from '../../models/movie.model';
import { FavouriteMovie } from '../../models/favourite-movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormComponent implements OnInit {
  @Input() movieForm: FormGroup;
  @Input() disabledClass: string;
  countryDropdown: DropdownMenu[];
  movies$: Observable<Movie[]>;
  isAutocompleteOpen: boolean;
  formViewClass: string;

  constructor(protected movieService: MovieService, protected router: Router) {}

  ngOnInit(): void {
    this.formViewClass = this.disabledClass
      ? 'd-flex justify-content-between'
      : '';
    this.getCountryDropdown();
    this.getAutocompletedMovies();
  }

  getCountryDropdown() {
    this.countryDropdown = [
      { label: 'IRL', value: 'Ireland' },
      { label: 'GBR', value: 'United Kingdom' },
    ];
  }

  submitForm() {
    if (!this.movieForm.valid) {
      this.validateErrorMessages(this.movieForm);
      return;
    }
    const movie: FavouriteMovie = Object.assign(this.movieForm.getRawValue());
    localStorage.setItem('favouriteMovie', JSON.stringify(movie));
    this.router.navigate(['thank-you']);
  }

  validateErrorMessages(form: FormGroup) {
    Object.keys(form.controls).forEach((name) => {
      const control = form.controls[name].errors;
      if (control && control.required) {
        form.controls[name].setErrors({ requiredError: true });
      } else if (control && control.email) {
        form.controls[name].setErrors({ emailError: true });
      } else if (control && control.pattern) {
        form.controls[name].setErrors({ patternError: true });
      } else if (control && control.minlength) {
        form.controls[name].setErrors({ minLengthError: true });
      } else if (control && control.maxlength) {
        form.controls[name].setErrors({ maxLengthError: true });
      }
    });
  }

  // SOLUTION FOR SETTING VALIDATIONS FOR POST CODE BY USING FUNCTION WHICH RETURNS OBJECT OF TYPE ValidatorFn
  // postCodeValidator(country: string): ValidatorFn {
  //   this.movieForm.get('postCode').clearValidators();
  //   return (formControl: FormControl): ValidationErrors => {
  //     if (country === 'Ireland') {
  //       return Validators.compose([
  //         Validators.minLength(6),
  //         Validators.maxLength(10),
  //       ])(formControl);
  //     } else {
  //       return Validators.compose([
  //         Validators.required,
  //         Validators.pattern(
  //           '^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$'
  //         ),
  //       ])(formControl);
  //     }
  //   };
  // }

  selectCountry() {
    // EXAMPLE OF SETTING VALIDATATORS BY CALLING FUNCTION postCodeValidator(country: string)
    // this.movieForm.controls.postCode.setValidators(
    //   this.postCodeValidator(this.movieForm.get('country').value)
    // );
    this.movieForm.get('postCode').clearValidators();
    if (this.movieForm.get('country').value === 'Ireland') {
      this.setPostCodeValidatorsIRL();
    } else {
      this.setPostCodeValidatorsUK();
    }
    this.movieForm.controls.postCode.updateValueAndValidity({
      emitEvent: false,
      onlySelf: true,
    });
  }

  private setPostCodeValidatorsIRL() {
    this.movieForm.controls.postCode.setValidators([
      Validators.minLength(6),
      Validators.maxLength(10),
    ]);
  }

  private setPostCodeValidatorsUK() {
    this.movieForm.controls.postCode.setValidators([
      Validators.required,
      Validators.pattern(
        '^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$'
      ),
    ]);
  }

  getAutocompletedMovies() {
    this.movies$ = this.movieForm.controls.favouriteMovie.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchValue: string) => {
        return this.movieService.getMoviesByTitle('movie', searchValue);
      })
    );
  }

  selectMovie(movieTitle: string) {
    this.isAutocompleteOpen = true;
    this.movieForm.controls.favouriteMovie.setValue(movieTitle);
  }
}
