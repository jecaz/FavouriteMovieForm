import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAutocompleteListComponent } from './dynamic-autocomplete-list.component';
import { MockProvider } from 'ng-mocks';
import { FormService } from '../../service/form.service';
import { of } from 'rxjs';

describe('DynamicAutocompleteListComponent', () => {
  let component: DynamicAutocompleteListComponent;
  let fixture: ComponentFixture<DynamicAutocompleteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicAutocompleteListComponent],
      providers: [MockProvider(FormService, {
        autocompleteOptions$: of(),
      })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAutocompleteListComponent);
    component = fixture.componentInstance;
    component.config = {
      fieldType: 'autocompleteList',
      label: 'Favourite Movie',
      name: 'favouriteMovie',
      placeholder: 'Enter your favourite movie',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
