import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from '../../services/messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./../../../styles/messages/messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  errors$: Observable<string[]>;

  constructor(protected messagesService: MessageService) {
    console.log('Created messages component');
  }

  ngOnInit(): void {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => (this.showMessages = true))
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
