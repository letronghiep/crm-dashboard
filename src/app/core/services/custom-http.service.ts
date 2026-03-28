import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {
  private apiUrl = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `Error ${error.status}: ${error.message}`;
    }
    console.error(message);
    return throwError(() => new Error(message));
  }

  get<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams, headers })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
