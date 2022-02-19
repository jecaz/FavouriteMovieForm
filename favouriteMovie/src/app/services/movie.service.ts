import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie.model';
import { MessageService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_URL = environment.baseUrl;
  private readonly activLinkSource = new BehaviorSubject<string>(null);
  readonly activLink$ = this.activLinkSource.asObservable();

  constructor(
    private http: HttpClient,
    private messagesService: MessageService
  ) {}

  getMoviesByTitle(type: string, movieTitle: string): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.API_URL}&type=${type}&s=${movieTitle}`)
      .pipe(
        map((response) => response['Search']),
        catchError((error) => {
          this.messagesService.showErrors(error.error.Error);
          console.log(error);
          return throwError(error);
        })
      );
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL}&i=${movieId}`).pipe(
      catchError((error) => {
        const message = 'Something went wrong. Movie not found!';
        this.messagesService.showErrors(message);
        console.log(error);
        return throwError(error);
      })
    );
  }

  setActivLink(string): void {
    this.activLinkSource.next(string);
  }
}
