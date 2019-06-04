import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {Observable} from "rxjs";

export class PersistedModelService<T> {
  pathName: string = 'api-url-path-for-model';

  constructor(public apiService: ApiService) { }

  delete(id: string): Observable<T> {
    return this.apiService.DELETE(`/${this.pathName}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.apiService.POST(`/${this.pathName}/`, data);
  }

  upsert(data: T): Observable<T> {
    return this.apiService.PUT(`/${this.pathName}/`, data);
  }

  findById(id: string): Observable<T> {
    return this.apiService.GET(`/${this.pathName}/${id}`);
  }
}
