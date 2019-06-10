import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {PersistedModelService} from "./persisted-model.service";

export interface IVideoTagModel {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class VideoTagService extends PersistedModelService<IVideoTagModel> {
  pathName: string = 'video-tags';

  constructor(public apiService: ApiService) {
    super(apiService);
  }
}
