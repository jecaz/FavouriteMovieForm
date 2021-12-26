import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankYouComponent } from './thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: ThankYouComponent,
  },
];

@NgModule({
  declarations: [ThankYouComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ThankYouComponent],
})
export class ThankYouModule {}
