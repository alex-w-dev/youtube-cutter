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

  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private canvasContext: CanvasRenderingContext2D = this.canvas.getContext('2d');

  private videoStart: number;
  private videoEnd: number;
  private recursVideoStart: number;
  private recursVideoEnd: number;
  private selectedVideoDuration: number;
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
          this.canvas.width = this.video.videoWidth;
          this.canvas.height = this.video.videoHeight;
          this.videoStart = 0;
          this.videoEnd = this.video.duration;
          this.selectedVideoDuration = this.video.duration;
        })
        // this.video.play();
      });
  }
  onVideoStartChange() {
    this.recursVideoStart = this.videoStart;
    this.recursVideoEnd = this.videoStart + 1;
    this.renewSelectedVideoDuration();
    this.startPlaySelectedVideoRecursively();
  }
  onVideoEndChange() {
    this.recursVideoEnd = this.videoEnd + 1;
    this.recursVideoStart = this.videoEnd;
    this.renewSelectedVideoDuration();
    this.startPlaySelectedVideoRecursively();
  }
  onVideoStartMouseup() {
    if (this.videoStart > this.videoEnd) this.videoStart = this.videoEnd;
    this.stopVideoPlaying();
  }
  onVideoEndMouseup() {
    if (this.videoEnd < this.videoStart) this.videoEnd = this.videoStart;
    this.stopVideoPlaying().then(() => console.log(this.isVideoPlaying(), 'this.isVideoPlaying()'));
  }


  private onPlaySelectedClick() {
    this.recursVideoEnd = this.videoEnd;
    this.recursVideoStart = this.videoStart;
    this.startPlaySelectedVideoRecursively();
  }


  private startPlaySelectedVideoRecursively() {
    this.stopVideoPlaying()
      .then(() => {
        const onTimeUpdate = () => {
          if (this.video.currentTime > this.recursVideoEnd) {
            this.video.currentTime = this.recursVideoStart;
          }
        };

        const onPause = () => {
          this.video.removeEventListener('pause', onPause);
          this.video.removeEventListener('timeupdate', onTimeUpdate)
        };

        this.video.addEventListener('pause', onPause);
        this.video.addEventListener('timeupdate', onTimeUpdate);

        this.video.currentTime = this.recursVideoStart;
        this.video.play();
      });
  }

  private isVideoPlaying() {
    return !!(this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2)
  }

  private stopVideoPlaying(): Promise<void> {
    if (this.isVideoPlaying()) {
      return new Promise((res) => {
        const onPause = () => {
          this.video.removeEventListener('pause', onPause);
          res();
        }
        this.video.addEventListener('pause', onPause);
        this.video.pause();
      })
    } else {
      return Promise.resolve();
    }
  }

  private renewSelectedVideoDuration() {
    this.selectedVideoDuration = Math.round((this.videoEnd - this.videoStart) * 100) / 100;
  }
}

