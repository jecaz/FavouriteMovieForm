import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EnterComponent } from './enter.component';
import { MockProviders, MockModule, MockProvider } from 'ng-mocks';
import { CountryService } from '../../services/country.service';
import { FormService } from '../../shared/dynamic-form/service/form.service';
import { MovieService } from '../../services/movie.service';
import { CardModule } from '../../shared/card/card.module';
import { of } from 'rxjs';

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

@Component({
  selector: 'app-movie-form',
  template: '<form [movieForm]="mockValidForm"></form>',
})
class MockMovieFormComponent {
  @Input() movieForm;
  @Input() disabledClass = '';
}

describe('EnterComponent', () => {
  let component: EnterComponent;
  let fixture: ComponentFixture<EnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(CardModule)],
      declarations: [EnterComponent, MockMovieFormComponent],
      providers: [
        MockProviders(FormBuilder, CountryService, FormService, MovieService),
        MockProvider(FormService, {
          formChanged$: of(),
      })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
