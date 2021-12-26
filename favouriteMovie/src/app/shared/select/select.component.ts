import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownMenu } from 'src/app/models/dropdown.model';

@Component({
  selector: 'app-select',
  template: `<select
    [formControl]="formControl"
    class="form-select"
    name="countries"
    id="{{ controlName }}"
    aria-label="Select dropdown menu"
  >
    <option disabled value="">Please select</option>
    <option *ngFor="let option of options" [value]="option.value">
      {{ option.value }}
    </option>
  </select>`,
})
export class SelectComponent implements OnInit {
  @Input() set control(value: FormControl) {
    if (this.formControl !== value) {
      this.formControl = value;
    }
  }
  @Input() options: DropdownMenu[];
  @Input() controlName: string;
  formControl: FormControl;
  constructor() {}

  ngOnInit(): void {}
}
