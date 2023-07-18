import { HttpErrorResponse } from "@angular/common/http";

export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  Actors?: string;
  Country?: string;
  Director?: string;
  Plot?: string;
  Released?: string;
  Runtime?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Writer?: string;
  Genre?: string;
}

export interface HttpRequestState<T> {
  isLoading: boolean;
  value?: T;
  error?: HttpErrorResponse | Error;
}
