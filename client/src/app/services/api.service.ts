import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFullUrl(url) {
    return `http://localhost:3000/api/${url}`;
  }

  GET(url: string, options?): Observable<any> {
    return this.http.get(this.getFullUrl(url), options);
  }

  POST(url: string, data?: any | FormData): Observable<any> {
    return this.http.post(this.getFullUrl(url), data);
  }

  PUT(url: string, data: any | FormData): Observable<any> {
    return this.http.put(this.getFullUrl(url), data);
  }

  PATCH(url: string, data): Observable<any> {
    return this.http.patch(this.getFullUrl(url), data);
  }

  DELETE(url: string) {
    return this.http.delete(this.getFullUrl(url));
  }
}
