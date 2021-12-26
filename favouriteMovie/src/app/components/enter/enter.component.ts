import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { DropdownMenu } from '../../models/dropdown.model';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterComponent implements OnInit {
  movieForm: FormGroup;
  countryDropdown: DropdownMenu[];

  constructor(
    protected formBuilder: FormBuilder,
    protected movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.countryDropdown = [
      { label: 'IRL', value: 'Ireland' },
      { label: 'GBR', value: 'United Kingdom' },
    ];
    this.movieForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[^0-9]*'),
      ]),
      username: new FormControl('', Validators.email),
      country: new FormControl('', Validators.required),
      postCode: new FormControl(''),
      favouriteMovie: new FormControl(''),
    });
    this.movieService.getMoviesByTitle('movie', 'year').subscribe((data) => {
      console.log(data);
    });
  }

  submitForm() {
    if (!this.movieForm.valid) {
      this.validateErrorMessages(this.movieForm);
      return;
    }
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
    // EXAMPLE OF SETTING VALIDATATORS BY CALLING FUNCTION postCodeValidator
    // this.movieForm.controls.postCode.setValidators(
    //   this.postCodeValidator(this.movieForm.get('country').value)
    // );
    this.movieForm.get('postCode').clearValidators();
    if (this.movieForm.get('country').value === 'Ireland') {
      this.movieForm.controls.postCode.setValidators([
        Validators.minLength(6),
        Validators.maxLength(10),
      ]);
    } else if (this.movieForm.get('country').value === 'United Kingdom') {
      this.movieForm.controls.postCode.setValidators([
        Validators.required,
        Validators.pattern(
          '^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$'
        ),
      ]);
    }
    this.movieForm.controls.postCode.updateValueAndValidity({
      emitEvent: false,
      onlySelf: true,
    });
  }
}
