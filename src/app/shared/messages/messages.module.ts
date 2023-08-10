import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [MessagesComponent],
  imports: [CommonModule],
  exports: [MessagesComponent],
})
export class MessagesModule {}
