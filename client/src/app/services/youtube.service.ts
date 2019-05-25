import { Injectable } from '@angular/core';
import {youtube_v3} from "googleapis";
import {Observable} from "rxjs";
import Schema$SearchListResponse = youtube_v3.Schema$SearchListResponse;
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import Schema$VideoCategoryListResponse = youtube_v3.Schema$VideoCategoryListResponse;

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private apiService: ApiService) { }

  searchList(params: {videoCategoryId?: string, daysBeforeToday?: string} = {}): Observable<Schema$SearchListResponse> {
    const httpParams = new HttpParams({
      fromObject: params,
    });

    return this.apiService.GET('youtube/searchList', { params: httpParams })
  }

  videoCategories(): Observable<Schema$VideoCategoryListResponse> {
    return this.apiService.GET('youtube/videoCategories')
  }
}
