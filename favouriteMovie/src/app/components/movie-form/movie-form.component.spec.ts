import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

import { MovieFormComponent } from './movie-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '../../shared/button/button.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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

describe('MovieFormComponent', () => {
  let component: MovieFormComponent;
  let fixture: ComponentFixture<MovieFormComponent>;
  let mockMovieService: MovieService;
  let router: Router;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ButtonModule, ReactiveFormsModule],
      declarations: [MovieFormComponent],
      providers: [{ provide: MovieService, useClass: MockMovieService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormComponent);
    component = fixture.componentInstance;
    component.movieForm = mockValidForm;
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
    fixture.detectChanges();
    const submitBtn = el.query(By.css('app-button')).nativeElement;
    submitBtn.click();
    expect(router.navigate).toHaveBeenCalledWith(['thankyou']);
  });

  it('should not submit form if it is invalid', () => {
    spyOn(router, 'navigate');
    component.movieForm = mockInvalidForm;
    fixture.detectChanges();
    const submitBtn = el.query(By.css('app-button')).nativeElement;
    submitBtn.click();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should select country and set validators', () => {
    mockValidForm.controls.country = new FormControl('Ireland');
    spyOn(mockValidForm.controls.postCode, 'updateValueAndValidity');
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
