import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YoutubeService} from "../../services/models/youtube.service";
import {ApiService} from "../../services/api.service";

interface IThumbnail {
  time: number;
  data: string;
  selected?: boolean;
}

@Component({
  selector: 'app-video-fragmentation',
  templateUrl: './video-fragmentation.component.html',
  styleUrls: ['./video-fragmentation.component.scss']
})
export class VideoFragmentationComponent implements OnInit {
  @Input() videoId: string = '-rdm3sPKtIg';
  //    @Input() videoId: string = 'YE7VzlLtp-4';
  @ViewChild('video', { static: true }) videoElement;
  video: HTMLVideoElement;

  private videoUrl: string;
  private startThumbs: IThumbnail[] = [];
  private endThumbs: IThumbnail[] = [];
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private canvasContext: CanvasRenderingContext2D = this.canvas.getContext('2d');

  constructor(private youtubeService: YoutubeService, private apiService: ApiService) { }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
      get: function(){
        return ;
      }
    })
    this.videoUrl = this.youtubeService.getLowestVideoUrl(this.videoId);
    this.youtubeService
      .getLowestVideo(this.videoId, (data) => {
        console.log(data, '----');
      })
      .subscribe((videoData) => {
        this.video.src = videoData;

        this.video.addEventListener('loadedmetadata', () => {
          // console.log(this.video.videoWidth, 'this.video.videoWidth');
          // console.log(this.video.videoHeight, 'this.video.videoHeight');
          this.canvas.width = this.video.videoWidth;
          this.canvas.height = this.video.videoHeight;
        })
        // this.video.play();
      });
  }

  private onVideoCurrentTimeInputChange($event) {
    this.video.currentTime = parseFloat($event || 0);
  }
  
  private renewThumbs() {
    [this.startThumbs, this.endThumbs]
      .filter(thumbs => thumbs.every(t => !t.selected))
      .forEach(thumbs => {
        thumbs.length = 0;
        const originalVideoCurrentTime = this.video.currentTime;
        const videoTimeOffset = this.video.duration * 0.01;
        const timeSet = new Set();
        for (let s = -videoTimeOffset; s < videoTimeOffset; s+=0.1) {
          let time = this.video.currentTime + s;
          if (time < 0) time = 0;
          if (time > this.video.duration) time = this.video.duration;
          timeSet.add(time);
        }

        const timeSetEntries = Array.from(timeSet);
        let i = 0;
        const recursivelyGetImages  = () => {
          return new Promise((res) => {
            const time = timeSetEntries[i++];

            if (time === undefined) {
              res();
            } else {
              const onTimeUpdate = () => {
                this.video.removeEventListener('timeupdate', onTimeUpdate);
                this.canvasContext.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
                const dataURL = this.canvas.toDataURL();
                thumbs.push({
                  data: dataURL,
                  time: time,
                });
                res(recursivelyGetImages());
              };
              this.video.addEventListener('timeupdate', onTimeUpdate);
              this.video.currentTime = time;
            }
          });
        };

        recursivelyGetImages()
          .then(() => {
            this.video.currentTime = originalVideoCurrentTime;
          });
      });
  }

  private toggleSelection(thumb: IThumbnail, thumbs: IThumbnail[]) {
    if (thumb.selected) {
      thumbs.forEach(t => t.selected = false)
    } else {
      const iterationDirection = (thumbs === this.startThumbs) ? 1 : -1;

      for (let i = thumbs.indexOf(thumb); i < thumbs.length && i >= 0; i+=iterationDirection) {
        thumbs[i].selected = true;
      }
    }
  }

  private playSelectedThumbs() {
    if (this.isVideoPlaying()) {
      this.video.pause();
      return;
    }
    if (!this.isSomeSelected(this.startThumbs) || !this.isSomeSelected(this.endThumbs)) return;

    const startThumb = this.startThumbs.find(t => t.selected);
    const endThumb = this.endThumbs.reduce((acc, t) => (t.selected) ? t : acc);

    const onTimeUpdate = () => {
      console.log(this.video.currentTime, endThumb.time, 'this.video.currentTime, endThumb.time');
      if (this.video.currentTime > endThumb.time) {
        this.video.currentTime = startThumb.time;
      }
    };

    const onPause = () => {
      this.video.removeEventListener('pause', onPause);
      this.video.removeEventListener('timeupdate', onTimeUpdate)
    };

    this.video.addEventListener('pause', onPause);
    this.video.addEventListener('timeupdate', onTimeUpdate);

    this.video.currentTime = startThumb.time;
    this.video.play();
  }

  private isSomeSelected(thumbs: IThumbnail[]) {
    return thumbs.some(t => t.selected);
  }

  private isVideoPlaying() {
    return !!(this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2)
  }
}

