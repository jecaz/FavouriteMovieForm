import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessageService {
  private errorsSource = new BehaviorSubject<string[]>([]);
  readonly errors$: Observable<string[]> = this.errorsSource
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  showErrors(...errors: string[]) {
    this.errorsSource.next(errors);
  }
}
