import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_URL = environment.baseUrl;
  private readonly activLinkSource = new BehaviorSubject<string>(null);
  readonly activLink$ = this.activLinkSource.asObservable();

  constructor(private http: HttpClient) {}

  getMoviesByTitle(type: string, movieTitle: string): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.API_URL}&type=${type}&s=${movieTitle}`)
      .pipe(
        map((response) => response['Search']),
        shareReplay(),
        catchError((error) => throwError(error))
      );
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this.http
      .get<Movie>(`${this.API_URL}&i=${movieId}`)
      .pipe(catchError((error) => throwError(error)));
  }

  setActivLink(string): void {
    this.activLinkSource.next(string);
  }
}
