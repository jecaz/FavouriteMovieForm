import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMoviesByTitle(type: string, movieTitle: string): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.API_URL}&type=${type}&s=${movieTitle}`)
      .pipe(
        map((response) => response['Search']),
        catchError((error) => throwError(error))
      );
  }
}
