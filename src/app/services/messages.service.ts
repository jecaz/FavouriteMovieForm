import { Message } from './../models/message.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessageService {
  private messaageSource = new BehaviorSubject<Message[]>([]);
  readonly messages$: Observable<Message[]> = this.messaageSource
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  showMessages(...messages: Message[]) {
    this.messaageSource.next(messages);
  }
}
