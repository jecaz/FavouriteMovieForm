import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EnterComponent } from './components/enter/enter.component';
import { EnterModule } from './components/enter/enter.module';

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [BrowserModule, AppRoutingModule, EnterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
