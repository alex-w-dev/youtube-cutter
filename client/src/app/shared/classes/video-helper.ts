import Helper from "./helper";

interface IV extends HTMLVideoElement {}

export default class VideoHelper {
  static startPlaySelectedVideoRecursively(video: IV, start: number, end: number) {
    this.startPlaySelectedVideoOnce(video, start, end).then((selfCompleted) => {
      if (selfCompleted) this.startPlaySelectedVideoRecursively(video, start, end);
    })
  }

  static startPlaySelectedVideoOnce(video: IV, start: number, end: number): Promise<boolean> {
    return new Promise((res) => {
      this.stopVideoPlaying(video)
        .then(() => {
          let timeout;
          let selfCompleted = false;

          const onPause = () => {
            video.removeEventListener('pause', onPause);
            clearTimeout(timeout);
            res(selfCompleted);
          };

          video.addEventListener('pause', onPause);

          video.currentTime = start;
          video.play().then(() => {
            timeout = setTimeout(() => {
              selfCompleted = true;
              video.pause();
            }, (end - start) * 1000)
          });
        });
    });
  }

  static setCurrentTime(video: IV, time: number): Promise<void> {
    return new Promise((res, rej) => {
      const onTimeUpdate = () => {
        video.removeEventListener('timeupdate', onTimeUpdate);
        res();
      };
      video.addEventListener('timeupdate', onTimeUpdate);
      video.currentTime = time;
    })
  }

  static isCurrentTime(currentTime: number, searchTime: number, step: number) {
    let a = 1;
    if (step === 0.1) a = 10;
    if (step === 0.01) a = 100;
    const b = Math.floor(Helper.round(searchTime * a, 100));
    const c = Math.floor(Helper.round(currentTime * a, 100));
    return Math.round(Math.abs(c - b ))  === 0;
  }

  static isVideoPlaying(video: IV) {
    return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)
  }

  static stopVideoPlaying(video: IV): Promise<void> {
    if (this.isVideoPlaying(video)) {
      return new Promise((res) => {
        const onPause = () => {
          video.removeEventListener('pause', onPause);
          res();
        };
        video.addEventListener('pause', onPause);
        video.pause();
      })
    } else {
      return Promise.resolve();
    }
  }
}
