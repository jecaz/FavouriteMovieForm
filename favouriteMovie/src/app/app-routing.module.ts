import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from './components/enter/enter.component';

const routes: Routes = [
  { path: '', redirectTo: 'enter', pathMatch: 'full' },
  {
    path: 'enter',
    component: EnterComponent,
  },
  { path: '**', redirectTo: 'enter', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
