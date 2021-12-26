import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="btn btn-primary px-5" type="'button'">{{ label }}</button>
  `,
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  constructor() {}

  ngOnInit(): void {}
}
