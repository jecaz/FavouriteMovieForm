import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpRequestState, Movie } from '../models/movie.model';
import { MessageService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_URL = environment.baseUrl;

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
          return throwError(error);
        })
      );
  }

  getMovieById(movieId: string): Observable<HttpRequestState<Movie>> {
    return this.http.get<Movie>(`${this.API_URL}&i=${movieId}`).pipe(
      map((value) => ({ isLoading: false, value })),
      catchError((error) => {
        const message = 'Something went wrong. Movie not found!';
        this.messagesService.showErrors(message);
        // return throwError(error);
        return of({ isLoading: false, error });
      }),
      startWith({ isLoading: true }),
    );
  }
}
