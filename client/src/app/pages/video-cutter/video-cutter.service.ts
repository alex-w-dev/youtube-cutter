import {Injectable} from '@angular/core';

@Injectable()
export class VideoCutterService {
  video: HTMLVideoElement;

  constructor() {
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
}
