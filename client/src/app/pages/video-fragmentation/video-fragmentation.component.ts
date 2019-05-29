import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {youtube_v3} from "googleapis";
import Schema$SearchListResponse = youtube_v3.Schema$SearchListResponse;
import Schema$VideoCategoryListResponse = youtube_v3.Schema$VideoCategoryListResponse;
import {ApiService} from "../../services/api.service";

function getDayStart(daysBeforeToday) {
  const getDayStart = new Date();
  getDayStart.setHours(0,0,0,0);
  getDayStart.setDate(getDayStart.getDate() - daysBeforeToday);

  return getDayStart.toISOString();
}

@Component({
  selector: 'app-video-fragmentation',
  templateUrl: './video-fragmentation.component.html',
  styleUrls: ['./video-fragmentation.component.scss']
})
export class VideoFragmentationComponent implements OnInit {
  @Input() videoId: string = '-rdm3sPKtIg';
  @ViewChild('video') videoElement;

  private videoUrl: string;

  constructor(private youtubeService: YoutubeService, private apiService: ApiService) { }

  ngOnInit() {
    this.youtubeService.getLowestVideo(this.videoId).subscribe((videoData) => {
      console.log(videoData, 'videoData');
      this.videoElement.nativeElement.src = videoData;

      this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
        // this.videoElement.nativeElement.load();
        // this.videoElement.nativeElement.style.width = this.videoElement.nativeElement.videoWidth + 'px';
        // this.videoElement.nativeElement.style.height = this.videoElement.nativeElement.videoHeight + 'px';
      })
      // this.videoElement.nativeElement.play();
    });
  }
}
