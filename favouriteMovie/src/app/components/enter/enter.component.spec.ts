import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { EnterComponent } from './enter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'src/app/shared/button/button.module';

const mockValidForm = new FormGroup({
  name: new FormControl('Name', [
    Validators.required,
    Validators.pattern('[^0-9]*'),
  ]),
  username: new FormControl('test@gmail.com', Validators.email),
  country: new FormControl('Ireland', Validators.required),
  postCode: new FormControl('123test'),
  favouriteMovie: new FormControl('Test movie'),
});

const mockInvalidForm = new FormGroup({
  name: new FormControl('2', [
    Validators.required,
    Validators.pattern('[^0-9]*'),
  ]),
  username: new FormControl('111', Validators.email),
  country: new FormControl('Ireland', Validators.required),
  postCode: new FormControl('123', [
    Validators.minLength(6),
    Validators.maxLength(10),
  ]),
  favouriteMovie: new FormControl('', Validators.required),
});

const movies: Movie[] = [
  {
    Poster: 'test poster',
    Title: 'test title',
    Type: 'movie',
    Year: '2002',
    imdbID: 'test imdbID',
  },
];
class MockMovieService {
  getMoviesByTitle(): Observable<Movie[]> {
    return of(movies);
  }
}

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;
  let mockMovieService: MovieService;
  let router: Router;
  let input: HTMLInputElement;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ButtonModule, ReactiveFormsModule],
      declarations: [EnterComponent],
      providers: [
        FormBuilder,
        { provide: MovieService, useClass: MockMovieService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockMovieService = TestBed.inject(MovieService);
    router = TestBed.inject(Router);
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form if it is valid', () => {
    spyOn(router, 'navigate');
    component.movieForm = mockValidForm;
    el.query(By.css('app-button')).triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['thank-you']);
  });

  it('should not submit form if it is invalid', () => {
    spyOn(router, 'navigate');
    component.movieForm = mockInvalidForm;
    component.submitForm();
    el.query(By.css('app-button')).triggerEventHandler('click', null);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should select country and set validators', () => {
    mockValidForm.controls.country = new FormControl('Ireland');
    spyOn(mockValidForm.controls.postCode, 'updateValueAndValidity');
    component.movieForm = mockValidForm;
    component.selectCountry();
    expect(
      component.movieForm.controls.postCode.updateValueAndValidity
    ).toHaveBeenCalled();
    mockValidForm.controls.country = new FormControl('Unitet Kingdom');
    component.movieForm = mockValidForm;
    component.selectCountry();
    expect(
      component.movieForm.controls.postCode.updateValueAndValidity
    ).toHaveBeenCalled();
  });

  it('should select movie', () => {
    const mockMovieTitle = 'Test movie title';
    component.selectMovie(mockMovieTitle);
    expect(component.movieForm.controls.favouriteMovie.value).toEqual(
      mockMovieTitle
    );
  });
});
