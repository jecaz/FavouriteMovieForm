import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAutocompleteListComponent } from './dynamic-autocomplete-list.component';

describe('DynamicAutocompleteListComponent', () => {
  let component: DynamicAutocompleteListComponent;
  let fixture: ComponentFixture<DynamicAutocompleteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicAutocompleteListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAutocompleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
