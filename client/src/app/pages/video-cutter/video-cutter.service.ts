import {Injectable} from '@angular/core';
import {IVideoFragmentModel, VideoFragmentService} from "../../services/models/video-fragment.service";
import {Observable, of} from "rxjs";
import VideoHelper from "../../shared/classes/video-helper";
import Helper from "../../shared/classes/helper";

@Injectable()
export class VideoCutterService {
  get video(): HTMLVideoElement {
    return this._video;
  }
  set video(value: HTMLVideoElement) {
    this._video = value;
    this._video.addEventListener('loadedmetadata', () => {
      this.startGenerateThumbsCache();
    })
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
    console.log(11, '11');
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = this.video.videoWidth / 5;
    canvas.height = this.video.videoHeight / 5;
    const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d');
    const selfThumbsCache = this.thumbsCache = {};
    const innerVideo: HTMLVideoElement = <HTMLVideoElement>this.video.cloneNode(true);

    let time = 0;
    const step = 1;


    console.time();
    innerVideo.addEventListener('loadedmetadata', () => {
      const recursively = () => {
        VideoHelper.setCurrentTime(innerVideo, time)
          .then(() => {
            if (time > innerVideo.duration || selfThumbsCache !== this.thumbsCache) return console.timeEnd();

            console.log(time, 'of', innerVideo.duration);

            canvasContext.drawImage(innerVideo, 0, 0, canvas.width, canvas.height);
            this.thumbsCache[time] = canvas.toDataURL();

            time = Helper.round(time + step, 10);

            recursively();
          })
      }

      recursively();
    })
  }
}
