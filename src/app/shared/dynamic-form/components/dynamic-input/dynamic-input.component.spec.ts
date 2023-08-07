import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { DynamicInputComponent } from './dynamic-input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DynamicInputComponent', () => {
  let component: DynamicInputComponent;
  let fixture: ComponentFixture<DynamicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(ReactiveFormsModule)],
      declarations: [DynamicInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicInputComponent);
    component = fixture.componentInstance;
    component.config = {
      fieldType: 'input',
      label: 'Username',
      name: 'username',
      placeholder: 'Enter your username',
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
