import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterComponent implements OnInit {
  movieForm: FormGroup;

  constructor(protected formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
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
  }
}
