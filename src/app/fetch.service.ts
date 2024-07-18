import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  data: any;

  constructor(private http: HttpClient) {

  }

  fetchData(limit: number, after: number):Observable<any> {
    return this.http.get<any> (`/api/fe/testimonials?limit=${limit}&after=${after}`);
  }

}
