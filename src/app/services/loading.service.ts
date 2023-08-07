import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingSource = new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this.loadingSource.asObservable();

  loadingOn() {
    this.loadingSource.next(true);
  }

  loadingOff() {
    this.loadingSource.next(false);
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }
}
