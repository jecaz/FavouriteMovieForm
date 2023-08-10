import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MessageService } from '../../services/messages.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./../../../styles/messages/messages.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class MessagesComponent implements OnInit {
  showMessage$ = new BehaviorSubject<boolean>(false);
  messages$: Observable<Message[]>;

  constructor(protected messagesService: MessageService) {}

  ngOnInit(): void {
    this.messages$ = this.messagesService.messages$.pipe(
      tap(() => (this.showMessage$.next(true)))
    );
    this.closeWithDelay();

  }

  closeWithDelay() {
      this.showMessage$
        .pipe(
          debounceTime(5000),
          distinctUntilChanged(),
          tap(() => this.showMessage$.next(false))
        )
        .subscribe()
  }

  onClose() {
    this.showMessage$.next(false)
  }
}
