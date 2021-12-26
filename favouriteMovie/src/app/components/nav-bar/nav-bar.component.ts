import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: ['.navbar { z-index: 10}'],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
