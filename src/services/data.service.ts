import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Superhero } from '../interfaces/superhero.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public httpError?: HttpErrorResponse;
  private jsonURL = '../../assets/wikipedia_marvel_data.json';
  
  constructor(private http: HttpClient) { }

  getSuperheroes(): Observable<Superhero[]>{
    return this.http.get<Superhero[]>(this.jsonURL);
  }

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