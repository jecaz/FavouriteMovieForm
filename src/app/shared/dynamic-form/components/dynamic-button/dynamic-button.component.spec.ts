import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicButtonComponent } from './dynamic-button.component';
import { MockProvider } from 'ng-mocks';
import { FormService } from '../../service/form.service';
import { of } from 'rxjs';

describe('DynamicButtonComponent', () => {
  let component: DynamicButtonComponent;
  let fixture: ComponentFixture<DynamicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicButtonComponent],
      providers: [MockProvider(FormService, {
        disabledButton$: of(),
      })]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicButtonComponent);
    component = fixture.componentInstance;
    component.config = {
      label: 'Submit',
      name: 'submit',
      fieldType: 'button',
      cssClass: 'd-flex justify-content-end',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
