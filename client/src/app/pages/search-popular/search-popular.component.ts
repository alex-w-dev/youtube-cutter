import { Component, OnInit } from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {youtube_v3} from "googleapis";
import Schema$SearchListResponse = youtube_v3.Schema$SearchListResponse;
import Schema$VideoCategoryListResponse = youtube_v3.Schema$VideoCategoryListResponse;

function getDayStart(daysBeforeToday) {
  const getDayStart = new Date();
  getDayStart.setHours(0,0,0,0);
  getDayStart.setDate(getDayStart.getDate() - daysBeforeToday);

  return getDayStart.toISOString();
}

@Component({
  selector: 'app-search-popular',
  templateUrl: './search-popular.component.html',
  styleUrls: ['./search-popular.component.scss']
})
export class SearchPopularComponent implements OnInit {
  private videoId: string;
  private daysBeforeToday: number = 0;
  private videoCategoryId: string = '1';
  private youtubeSearchResult: Schema$SearchListResponse;
  private youtubeVideoCategoriesListResult: Schema$VideoCategoryListResponse;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.youtubeService.videoCategories().subscribe((res) => {
      this.youtubeVideoCategoriesListResult = res;
    });
    this.renewList()
  }

  setVideoId(videoId) {
    this.videoId = null;
    setTimeout(() => {
      this.videoId = videoId;
    }, 500);
  }

  setVideoCategoryId(videoCategoryId) {
    this.videoCategoryId = videoCategoryId;
    this.renewList();
  }

  private renewList() {
    this.youtubeService
      .searchList({
        videoCategoryId: this.videoCategoryId,
      })
      .subscribe((res) => {
        this.youtubeSearchResult = res;
        console.log(this.youtubeSearchResult.items, 'youtubeSearchResult?.items');
      });
  }

}
