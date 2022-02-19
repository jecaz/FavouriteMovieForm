import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['.container {margin-top: 100px}'],
  providers: [LoadingService],
})
export class AppComponent {}
