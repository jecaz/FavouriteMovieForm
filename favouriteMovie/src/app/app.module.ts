import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EnterModule } from './components/enter/enter.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, EnterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
