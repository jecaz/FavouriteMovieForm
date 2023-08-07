import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EnterModule } from './components/enter/enter.module';
import { HttpClientModule } from '@angular/common/http';
import { ThankYouModule } from './components/thank-you/thank-you.module';
import { LoadingModule } from './shared/loading/loading.module';
import { MessagesModule } from './shared/messages/messages.module';
import { MessageService } from './services/messages.service';
import { ModalModule } from './shared/modal/modal.module';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EnterModule,
    ThankYouModule,
    LoadingModule,
    MessagesModule,
    ModalModule,
  ],
  providers: [MessageService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
