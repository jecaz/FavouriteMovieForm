import { CountryService } from './../../services/country.service';
import { ModalService } from './../../services/modal.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { DropdownMenu } from '../../models/dropdown.model';
import { Movie } from '../../models/movie.model';
import { FavouriteMovie } from '../../models/favourite-movie.model';
import { Unsubscribe } from '../../shared/utils/unsubscribe';
import { IRL_POST_CODE_VALIDATORS, UK_POST_CODE_VALIDATORS } from '../../shared/validators/post-code.validator';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormComponent extends Unsubscribe implements OnInit {
  @Input() movieForm: FormGroup;
  @Input() readonly: boolean;
  countryDropdown: DropdownMenu[];
  movies$: Observable<Movie[]>;
  isAutocompleteOpen = false;

  constructor(
    protected countryService: CountryService,
    protected movieService: MovieService,
    protected router: Router,
    protected modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    this.countryDropdown = this.countryService.getCountryDropdown();
    this.getAutocompletedMovies();
  }

  submitForm() {
    if (!this.movieForm.valid) {
      this.movieForm.markAllAsTouched();
      return;
    }
    const movie: FavouriteMovie = Object.assign(this.movieForm.getRawValue());
    sessionStorage.setItem('favouriteMovie', JSON.stringify(movie));
    this.setModalContent();
    this.modalService.open().pipe(
      takeUntil(this.destroy$),
      filter((action) => !!action),
      tap(() => this.router.navigate(['thankyou']))
    ).subscribe();
  }

  private setModalContent(): void {
    this.modalService.setModalContent({
      title: 'Favourite movie',
      body: 'You are one step close to submit a new favourite movie.',
      rejectButtonText: 'Cancel',
      confirmButtonText: 'Save',
    });
  }

  selectCountry() {
    // EXAMPLE OF SETTING VALIDATATORS BY CALLING FUNCTION postCodeValidator(country: string)
    // this.movieForm.controls.postCode.setValidators(
    //   this.postCodeValidator(this.movieForm.get('country').value)
    // );
    this.movieForm.get('postCode').clearValidators();
    if (this.movieForm.get('country').value === 'IRL') {
      this.setPostCodeValidatorsIRL();
    } else {
      this.setPostCodeValidatorsUK();
    }
    this.movieForm.controls.postCode.updateValueAndValidity();
  }

  private setPostCodeValidatorsIRL() {
    this.movieForm.controls.postCode.setValidators(IRL_POST_CODE_VALIDATORS);
  }

  private setPostCodeValidatorsUK() {
    this.movieForm.controls.postCode.setValidators(UK_POST_CODE_VALIDATORS);
  }

  getAutocompletedMovies(): void {
    this.movies$ = this.movieForm.controls.favouriteMovie.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((searchValue) => !!searchValue),
      takeUntil(this.destroy$),
      switchMap((searchValue: string) => this.movieService.getMoviesByTitle('movie', searchValue))
    );
  }

  selectMovie(favouriteMovie: string) {
    this.isAutocompleteOpen = false;
    this.movieForm.patchValue({ favouriteMovie });
  }
}
