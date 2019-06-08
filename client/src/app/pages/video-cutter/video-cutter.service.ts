import {Injectable} from '@angular/core';
import {IVideoFragmentModel, VideoFragmentService} from "../../services/models/video-fragment.service";
import {Observable, of} from "rxjs";

@Injectable()
export class VideoCutterService {
  video: HTMLVideoElement;

  constructor(
    private videoFragmentService: VideoFragmentService,
  ) {
  }

  createPrevious(videoId, endTime: number = 0): Observable<IVideoFragmentModel> {
    return this.videoFragmentService
      .create({
        end: endTime,
        start: 0,
        yVideoId: videoId,
      })
  }

  createNext(videoId, startTime: number = 0): Observable<IVideoFragmentModel> {
    return this.videoFragmentService
      .create({
        end: this.video.duration,
        start: startTime,
        yVideoId: videoId,
      })
  }

  removeFragment(fragment: IVideoFragmentModel): Observable<any> {
    if (confirm('Really Delete?')) {
      return this.videoFragmentService
        .delete(fragment.id)
    } else {
      of(null);
    }
  }

  startPlaySelectedVideoRecursively(start: number, end: number) {
    this.startPlaySelectedVideoOnce(start, end).then((selfCompleted) => {
      if (selfCompleted) this.startPlaySelectedVideoRecursively(start, end);
    })
  }

  startPlaySelectedVideoOnce(start: number, end: number): Promise<boolean> {
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

          this.video.currentTime = start;
          this.video.play().then(() => {
            timeout = setTimeout(() => {
              selfCompleted = true;
              this.video.pause();
            }, (end - start) * 1000)
          });
        });
    });

  }

  private isVideoPlaying() {
    return !!(this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2)
  }

  stopVideoPlaying(): Promise<void> {
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
}
