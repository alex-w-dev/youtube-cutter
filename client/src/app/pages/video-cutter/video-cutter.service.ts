import {Injectable} from '@angular/core';
import {IVideoFragmentModel, VideoFragmentService} from "../../services/models/video-fragment.service";
import {Observable, of} from "rxjs";
import VideoHelper from "../../shared/classes/video-helper";

@Injectable()
export class VideoCutterService {
  get video(): HTMLVideoElement {
    return this._video;
  }
  set video(value: HTMLVideoElement) {
    this._video = value;
    this.startGenerateThumbsCache();
  }
  private _video: HTMLVideoElement;

  public thumbsCache: { [time: string]: string } = {};

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
        tagNames: [],
      })
  }

  createNext(videoId, startTime: number = 0): Observable<IVideoFragmentModel> {
    return this.videoFragmentService
      .create({
        end: this._video.duration,
        start: startTime,
        yVideoId: videoId,
        tagNames: [],
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
    VideoHelper.startPlaySelectedVideoRecursively(this.video, start, end);
  }

  startPlaySelectedVideoOnce(start: number, end: number): Promise<boolean> {
    return VideoHelper.startPlaySelectedVideoOnce(this.video, start, end);

  }

  private isVideoPlaying() {
    return VideoHelper.isVideoPlaying(this.video);
  }

  stopVideoPlaying(): Promise<void> {
    return VideoHelper.stopVideoPlaying(this.video);
  }

  private startGenerateThumbsCache() {
    // const canvas: HTMLCanvasElement = document.createElement('canvas');
    // const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d');
    // const selfThumbsCache = this.thumbsCache = {};
    // const selfVideo: HTMLVideoElement = this.video.cloneNode();
    // selfVideo.currentTime = 0;
    //
    // const get
    //
    //
    // const newThumbs = [];
    // this.thumbs = [];
    // this.lastRenewThumbsRequest = selfRenewThumbsRequest;
    // const timeSet = new Set();
    // for (let s = -(this.step * 5); s < (this.step * 5); s+=this.step) {
    //   let time = this.value + s;
    //   if (time < 0) time = 0;
    //   if (time > this.innerVideo.duration) time = this.innerVideo.duration;
    //   timeSet.add(Helper.round(time, 100));
    // }
    //
    // const timeArray = Array.from(timeSet);
    // let i = 0;
    //
    // const recursivelyGetImages  = () => {
    //   return new Promise((res, rej) => {
    //     if (selfThumbsCache !== this.thumbsCache) return rej();
    //
    //     const time = timeArray[i++];
    //
    //     if (time === undefined) {
    //       res();
    //     } else {
    //       const onTimeUpdate = () => {
    //         this.innerVideo.removeEventListener('timeupdate', onTimeUpdate);
    //         this.canvasContext.drawImage(this.innerVideo, 0, 0, this.canvas.width, this.canvas.height);
    //         const dataURL = this.canvas.toDataURL();
    //
    //         // todo redo
    //         const selected = (() => {
    //           let a = 1;
    //           if (this.step === 0.1) a = 10;
    //           if (this.step === 0.01) a = 100;
    //           const b = Math.floor(Helper.round(time * a, 100));
    //           const c = Math.floor(Helper.round(this.value * a, 100));
    //           return Math.round(Math.abs(c - b ))  === 0;
    //         })();
    //
    //         newThumbs.push({
    //           imageData: dataURL,
    //           time: Helper.round(time, 100),
    //           selected: selected,
    //         });
    //         res(recursivelyGetImages());
    //       };
    //       this.innerVideo.addEventListener('timeupdate', onTimeUpdate);
    //       this.innerVideo.currentTime = time;
    //     }
    //   });
    // };
    //
    // recursivelyGetImages()
    //   .then(() => {
    //     this.lastRenewThumbsRequest = null;
    //     this.thumbs = newThumbs;
    //   })
    //   .catch(() => {
    //   });
  }
}
