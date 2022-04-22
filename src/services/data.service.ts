import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Superhero } from '../interfaces/superhero.interface';

const LOCAL_STORAGE_ID = 'superheroes';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public httpError?: HttpErrorResponse;
  private jsonURL = './assets/wikipedia_marvel_data.json';
  
  constructor(private http: HttpClient) { }

  getSuperheroes(): Observable<Superhero[]>{
    return localStorage.getItem(LOCAL_STORAGE_ID) ?
      of(JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID) || '')):
      this.http.get<Superhero[]>(this.jsonURL);
  }

  saveSuperheroes(superheroes: Superhero[]): void {
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(superheroes));
  }

  restoreSuperheroes(): void {
    localStorage.removeItem(LOCAL_STORAGE_ID);
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