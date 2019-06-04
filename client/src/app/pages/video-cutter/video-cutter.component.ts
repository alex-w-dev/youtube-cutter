import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YoutubeService} from "../../services/models/youtube.service";
import {ApiService} from "../../services/api.service";

interface IThumbnail {
  time: number;
  data: string;
  selected?: boolean;
}

@Component({
  selector: 'app-video-cutter',
  templateUrl: './video-cutter.component.html',
  styleUrls: ['./video-cutter.component.scss']
})
export class VideoCutterComponent implements OnInit {
  // @Input() videoId: string = 'UFZ_EE3dH4c'; // клоун
  // @Input() videoId: string = '-rdm3sPKtIg'; - не смешно
  @Input() videoId: string = 'YE7VzlLtp-4'; // длинное
  @ViewChild('video') videoElement;
  video: HTMLVideoElement;

  private loadingProc: number = 0;
  private videoLoaded: boolean = false;

  constructor(private youtubeService: YoutubeService, private apiService: ApiService) { }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    this.youtubeService
      .getLowestVideo(this.videoId, (data) => {
        console.log(data, '----');
        this.loadingProc = Math.round(data.loaded / data.total * 100);
      })
      .subscribe((videoData) => {
        this.video.src = videoData;

        this.video.addEventListener('loadedmetadata', () => {
          this.videoLoaded = true;
        })
        // this.video.play();
      });
  }
}

