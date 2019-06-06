import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVideoFragmentModel} from "../../../services/models/video-fragment.service";

@Component({
  selector: 'app-video-fragment-editor',
  templateUrl: './video-fragment-editor.component.html',
  styleUrls: ['./video-fragment-editor.component.scss']
})
export class VideoFragmentEditorComponent implements OnInit {
  @Input() videoFragment: IVideoFragmentModel;
  @Input() video: HTMLVideoElement;
  @Output() onFragmentChange: EventEmitter<IVideoFragmentModel> = new EventEmitter();

  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private canvasContext: CanvasRenderingContext2D = this.canvas.getContext('2d');

  private recursVideoStart: number;
  private recursVideoEnd: number;
  private selectedVideoDuration: number;

  constructor() { }

  ngOnInit() {
    if (!this.videoFragment) throw new Error('Input videoFragment is required');
    if (!this.video) throw new Error('Input video is required');

    this.renewSelectedVideoDuration();
  }

  onVideoStartChange() {
    this.recursVideoStart = this.videoFragment.start;
    this.recursVideoEnd = this.videoFragment.start + 1;
    this.renewSelectedVideoDuration();
    this.startPlaySelectedVideoRecursively();
    this.onFragmentChange.emit(this.videoFragment);
  }
  onVideoEndChange() {
    this.recursVideoEnd = this.videoFragment.end + 1;
    this.recursVideoStart = this.videoFragment.end;
    this.renewSelectedVideoDuration();
    this.startPlaySelectedVideoRecursively();
    this.onFragmentChange.emit(this.videoFragment);
  }
  onVideoStartMouseup() {
    if (this.videoFragment.start > this.videoFragment.end) this.videoFragment.start = this.videoFragment.end;
    this.stopVideoPlaying();
  }
  onVideoEndMouseup() {
    if (this.videoFragment.end < this.videoFragment.start) this.videoFragment.end = this.videoFragment.start;
    this.stopVideoPlaying().then(() => console.log(this.isVideoPlaying(), 'this.isVideoPlaying()'));
  }


  private onPlaySelectedClick() {
    this.recursVideoEnd = this.videoFragment.end;
    this.recursVideoStart = this.videoFragment.start;
    this.startPlaySelectedVideoRecursively();
  }


  private startPlaySelectedVideoRecursively() {
    this.startPlaySelectedVideoOnce().then((selfCompleted) => {
      if (selfCompleted) this.startPlaySelectedVideoRecursively();
    })
  }

  private startPlaySelectedVideoOnce(): Promise<boolean> {
    return new Promise((res) => {
      this.stopVideoPlaying()
        .then(() => {
          let timeout;
          let selfCompleted = false;

          const onPause = () => {
            this.video.removeEventListener('pause', onPause);
            clearTimeout(timeout);
            res(selfCompleted);
          };

          this.video.addEventListener('pause', onPause);

          this.video.currentTime = this.recursVideoStart;
          this.video.play().then(() => {
            timeout = setTimeout(() => {
              selfCompleted = true;
              this.video.pause();
            }, (this.recursVideoEnd - this.recursVideoStart) * 1000)
          });
        });
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
    this.selectedVideoDuration = Math.round((this.videoFragment.end - this.videoFragment.start) * 100) / 100;
  }
}
