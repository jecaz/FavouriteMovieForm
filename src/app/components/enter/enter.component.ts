import { MovieService } from './../../services/movie.service';
import { UK_POST_CODE_VALIDATORS } from './../../shared/validators/post-code.validator';
import { DynamicFormComponent } from './../../shared/dynamic-form/dynamic-form.component';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { movieConfig } from '../movie-form/movie-form-config';
import { CountryService } from '../../services/country.service';
import { FormConfig } from '../../models/form-config';
import { FormService } from '../../shared/dynamic-form/service/form.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { IRL_POST_CODE_VALIDATORS } from '../../shared/validators/post-code.validator';
import { Unsubscribe } from '../../shared/utils/unsubscribe';
import { isNumber } from '../../shared/validators/number.validator';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterComponent extends Unsubscribe implements OnInit {
  movieForm: FormGroup;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  /**
   Configuration  for dynamically created form elements
  **/
  config: FormConfig[] = movieConfig;

  submit(form: FormGroup) {
    console.log(form);
  }

  constructor(
    protected formBuilder: FormBuilder,
    protected readonly countryService: CountryService,
    private readonly formService: FormService,
    protected readonly movieService: MovieService
  ) {
    super();
  }

  ngOnInit(): void {
    this.config[2].options = this.countryService.getCountryDropdown();
    sessionStorage.removeItem('selectedRating');
    this.initForm();
    this.formService.formChanged$
      .pipe(
        filter((form) => !!form),
        tap((form: FormGroup) => {
          if (form.controls.country.value === 'IRL') {
            form.controls.postCode.setValidators(IRL_POST_CODE_VALIDATORS);
          } else if (form.controls.country.value === 'GBR') {
            form.controls.postCode.setValidators(UK_POST_CODE_VALIDATORS);
          }
          this.getAutocompletedList(form);
        })
      )
      .subscribe();
  }

  initForm() {
    // Init form which uses Control value accessor directive
    this.movieForm = this.formService.createFormGroup(this.config);
  }

  getAutocompletedList(form: FormGroup): void {
    form.controls.favouriteMovie.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((searchValue) => {
          if (!searchValue) {
            this.formService.setAutocompletedOption(null);
            return false;
          }
          return true;
        }),
        takeUntil(this.destroy$),
        switchMap((searchValue: string) =>
          this.movieService
            .getMoviesByTitle('movie', searchValue)
            .pipe(map((movies) => movies?.map((movie) => movie.Title)))
        ),
        tap((movies) => this.formService.setAutocompletedOption(movies))
      ).subscribe();
  }
}
