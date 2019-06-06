import { Component, OnInit } from '@angular/core';
import {IVideoModel, VideoService} from "../../services/models/video.service";

@Component({
  selector: 'app-video-list-for-review',
  templateUrl: './video-list-for-review.component.html',
  styleUrls: ['./video-list-for-review.component.scss']
})
export class VideoListForReviewComponent implements OnInit {
  videos: IVideoModel[];

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getAllForReview().subscribe((res) => {
      this.videos = res;
    });
  }
}
