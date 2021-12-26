import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from './components/enter/enter.component';

const routes: Routes = [
  { path: '', redirectTo: 'enter', pathMatch: 'full' },
  { path: 'enter', component: EnterComponent },
  {
    path: 'thank-you',
    loadChildren: () =>
      import('./components/thank-you/thank-you.module').then(
        (m) => m.ThankYouModule
      ),
  },
  { path: '**', redirectTo: 'enter', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
