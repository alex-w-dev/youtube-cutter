import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {youtube_v3} from "googleapis";
import Schema$SearchResult = youtube_v3.Schema$SearchResult;
import {PersistedModelService} from "./persisted-model.service";
import {ApiService} from "../api.service";

export interface IVideoModel {
  yVideoInfo: Schema$SearchResult,
  yVideoId: string,
  reviewed: boolean,
  id?: string,
}

export interface IGetAllForReviewResp extends IVideoModel{
  videoFragmentCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService extends PersistedModelService<IVideoModel> {
  pathName = 'videos';

  constructor(public apiService: ApiService) {
    super(apiService);
  }

  getAllForReview(): Observable<IGetAllForReviewResp[]> {
    return this.apiService.GET(`/${this.pathName}/getAllForReview`)
  }
}
