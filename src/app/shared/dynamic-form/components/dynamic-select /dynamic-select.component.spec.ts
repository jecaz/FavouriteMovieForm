import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSelectComponent } from './dynamic-select.component';

describe('DynamicSelectComponent', () => {
  let component: DynamicSelectComponent;
  let fixture: ComponentFixture<DynamicSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSelectComponent);
    component = fixture.componentInstance;
    component.config  = {
      fieldType: 'select',
      label: 'Country',
      name: 'country',
      options: [],
      placeholder: 'Select an option',
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
