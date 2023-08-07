import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormGroupDirective, FormControl } from '@angular/forms';
import {
  distinctUntilChanged,
  tap,
  takeUntil,
  debounceTime,
} from 'rxjs/operators';
import { FormConfig } from '../../../../models/form-config';
import { ControlErrorComponent } from './control-error.component';
import { Unsubscribe } from '../../../utils/unsubscribe';
import { ERROR_MESSAGES } from './default-control-error';

@Directive({
  selector: '[controlError]',
})
export class ControlErrorDirective extends Unsubscribe implements OnInit {
  @Input()
  config: FormConfig;

  controlErrorComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ControlErrorComponent);

  controlErrorComponent = this.viewContainerRef.createComponent(this.controlErrorComponentFactory);

  constructor(
    private readonly formGroupDirective: FormGroupDirective,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          takeUntil(this.destroy$),
          tap(() => {
            this.controlErrorComponent.instance.control = this.control;
            this.controlErrorComponent.instance.errorMessage$.next(
              this.errorMessage
            );
          })
        )
        .subscribe();
    }
  }

  get errorMessage(): string {
    const errors = Object.entries(this.control?.errors || {});
    if (!errors.length) {
      return '';
    }
    const [key, value] = errors[0];

    return ERROR_MESSAGES[key](value);
  }

  get control(): FormControl {
    return this.formGroupDirective.control.controls[
      this.config.name
    ] as FormControl;
  }
}
