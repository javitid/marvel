import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpError?: HttpErrorResponse;
  
  constructor(private http: HttpClient) { }

  getDataFromUrl(url: string): Observable<object>{
    const usersRetrieved = this.http.get<object>(url);
    return usersRetrieved;
  }

  postDataFromUrl(url: string, params: string): Observable<object>{
    const usersRetrieved = this.http.post<object>(url, params);
    return usersRetrieved;
  }

  getHttpError(): HttpErrorResponse|undefined  {
    return this.httpError;
  }

  setHttpError(error: HttpErrorResponse): void {
    this.httpError = error;
  }
}