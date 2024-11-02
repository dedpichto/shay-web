import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../interfaces/city';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  apiUrl:string="https://localhost:44345/data/cities";

  constructor(private http: HttpClient) { }

  // getCities(): Observable<City[]> { 
  //   return this.http.get<City[]>(this.apiUrl).pipe( tap(data => console.log('Fetched cities:', data))) ;
  // }
  getCities(): Observable<City[]> {
     return this.http.get<City[]>("https://localhost:44345/data/cities");
  }

}
