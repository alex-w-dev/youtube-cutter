import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {PersistedModelService} from "./persisted-model.service";

export interface IVideoFragmentModel {
  id?: string;
  yVideoId: string;
  start: number;
  end: number;
}

@Injectable({
  providedIn: 'root',
})
export class VideoFragmentService extends PersistedModelService<IVideoFragmentModel> {
  pathName: string = 'video-fragments';

  constructor(public apiService: ApiService) {
    super(apiService);
  }

  getByYVideoId(yVideoId: string): Observable<IVideoFragmentModel[]> {
    return this.apiService.GET(
      `/${this.pathName}/getByYVideoId`,
      { params: new HttpParams({ fromObject: { yVideoId }}) }
      );
  }
}
