import { Injectable } from '@angular/core';
import {youtube_v3} from "googleapis";
import {Observable} from "rxjs";
import Schema$SearchListResponse = youtube_v3.Schema$SearchListResponse;
import {ApiService} from "../api.service";
import {HttpParams} from "@angular/common/http";
import Schema$VideoCategoryListResponse = youtube_v3.Schema$VideoCategoryListResponse;

// from ytdl-code on backend
interface IVideoFormat {
  s?: string;
  sig?: string;
  xtags?: string;
  clen?: string;
  size?: string;
  projection_type?: string;
  lmt?: string;
  init?: string;
  fps?: string;
  index?: string;
  type?: string;
  quality?: 'hd720' | 'medium' | 'small' | string;
  quality_label?: '144p' | '240p' | '270p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '2160p' | '4320p';
  url: string;
  itag: string;
  container: 'flv' | '3gp' | 'mp4' | 'webm' | 'ts';
  resolution: '144p' | '240p' | '270p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '2160p' | '4320p';
  encoding: 'Sorenson H.283' | 'MPEG-4 Visual' | 'VP8' | 'VP9' | 'H.264';
  profile: '3d' | 'high' | 'main' | 'simple' | 'baseline' | 'Main@L3.1';
  bitrate: string;
  audioEncoding: 'mp3' | 'vorbis' | 'aac' | 'opus' | 'flac';
  audioBitrate: number;
  live: boolean;
  isHLS: boolean;
  isDashMPD: boolean;
}

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

  getLowestVideo(videoId: string, onProgress?: (v: any) => void): Observable<string> {
    return this.apiService.GET_BLOB('youtube/getLowestVideo/'+videoId, onProgress);
  }

  getLowestVideoUrl(videoId: string): string {
    return this.apiService.getFullUrl('youtube/getLowestVideo/'+videoId);
  }
}
