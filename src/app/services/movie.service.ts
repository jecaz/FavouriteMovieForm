import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpRequestState, Movie } from '../models/movie.model';
import { MessageService } from './messages.service';
import { MessageType } from '../models/message.model';

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
    const params = new HttpParams().set('type', type).set('s', movieTitle);
    return this.http
      .get<Movie[]>(`${this.API_URL}`, { params })
      .pipe(
        map((response) => response['Search']),
        catchError((error) => {
          this.messagesService.showMessages({ message: error.error.Error, type: MessageType.DANGER });
          return throwError(error);
        })
      );
  }

  getMovieById(movieId: string): Observable<HttpRequestState<Movie>> {
    const params = new HttpParams().set('i', movieId);
    return this.http.get<Movie>(`${this.API_URL}`, { params }).pipe(
      map((data) => ({ isLoading: false, data })),
      catchError((error) => {
        const message = 'Something went wrong. Movie not found!';
        this.messagesService.showMessages({ message, type: MessageType.DANGER });
        return throwError(error);
      }),
      startWith({ isLoading: true }),
    );
  }
}
