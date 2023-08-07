import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouComponent } from './thank-you.component';
import { MockProvider, MockModule } from 'ng-mocks';
import { LoadingService } from '../../services/loading.service';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { CardModule } from '../../shared/card/card.module';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(CardModule)],
      declarations: [ThankYouComponent],
      providers: [MockProvider(LoadingService), MockProvider(MovieService, {
        getMoviesByTitle: () => of([]),
      })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    component.movieForm = new FormGroup({
      favouriteMovie: new FormControl('')
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
