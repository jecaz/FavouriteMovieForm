import { FormConfig } from 'src/app/models/form-config';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from './service/form.service';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  @Input()
  config: FormConfig[] = [];

  @Output()
  submitForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;

  get configControls(): FormConfig[] {
    // return this.config.filter(({ fieldType }) => fieldType !== 'button');
    return this.formService.configControls(this.config);
  }

  get changes(): Observable<unknown> {
    return this.form.valueChanges;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get value(): unknown {
    return this.form.value;
  }

  constructor(private readonly formService: FormService) {}

  ngOnInit() {
    this.form = this.createFormGroup();
    this.formService.disableSubmitButton(!this.valid);
    this.changes.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.formService.hasFormChanged(this.form);
        this.formService.disableSubmitButton(!this.valid);
      })
    ).subscribe();

    // TODO: prefill form here
  }

  createFormGroup(): FormGroup {
    return this.formService.createFormGroup(this.config);
  }

  createFormControl(config: FormConfig): FormControl {
    return this.formService.createFormControl(config);
  }

  handleSubmit(event: Event): void {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    event.preventDefault();
    event.stopPropagation();
    this.submitForm.emit(this.form);
  }

  setDisabled(name: string, disable: boolean): void  {
    this.formService.setDisabled(this.form, this.config, name, disable)
  }

  setValue(name: string, value: unknown): void {
    this.formService.setValue(this.form, name, value);
  }
}
