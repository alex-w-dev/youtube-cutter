import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "../../../../shared/classes/value-accessor-base";
import Helper from "../../../../shared/classes/helper";
import VideoHelper from "../../../../shared/classes/video-helper";
import {VideoCutterService} from "../../video-cutter.service";

interface IThumbnail {
  time: number;
  imageData: string;
  selected: boolean;
}

@Component({
  selector: 'app-ranged-thumbs',
  templateUrl: 'ranged-thumbs.component.html',
  styleUrls: ['ranged-thumbs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangedThumbsComponent),
      multi: true,
    }
  ]
})

export class RangedThumbsComponent extends ValueAccessorBase<number> implements OnInit {
  @Input() video: HTMLVideoElement;
  @Input() step: number = 0.1;
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private canvasContext: CanvasRenderingContext2D = this.canvas.getContext('2d');

  private thumbs: IThumbnail[] = [];
  private innerVideo: HTMLVideoElement;

  private throttledRenewThumbs: Function = Helper.throttle(this.renewThumbs, 500);

  constructor(private videoCutterService: VideoCutterService) {
    super();
  }

  ngOnInit() {
    if(!this.video) throw new Error('Input video is required');

    this.innerVideo = <HTMLVideoElement>this.video.cloneNode(true);

    this.innerVideo.addEventListener('loadedmetadata', () => {
      this.canvas.width = this.video.videoWidth / 5;
      this.canvas.height = this.video.videoHeight / 5;

      this.registerOnChange((value) => {
        this.renewThumbs();
      });
      this.renewThumbs();
    })
  }

  onThumbClicked(value) {
    this.value = value;
  }

  private renewThumbs() {
    const newThumbs = this.thumbs = [];
    const timeSet = new Set();
    for (let s = -(this.step * 5); s < (this.step * 5); s+=this.step) {
      let time = this.value + s;
      if (time < 0) time = 0;
      if (time > this.innerVideo.duration) time = this.innerVideo.duration;
      timeSet.add(Helper.round(time, 100));
    }

    const timeArray = Array.from(timeSet);
    let i = 0;
    const recursivelyGetImages  = () => {
      const time = timeArray[i++];

      if (this.thumbs !== newThumbs || time === undefined) return;

      if (this.videoCutterService.thumbsCache[time]) {
        console.log(1, '1');
        newThumbs.push({
          imageData: this.videoCutterService.thumbsCache[time],
          time: Helper.round(time, 100),
          selected: VideoHelper.isCurrentTime(this.value, time, this.step),
        });

        recursivelyGetImages()
      } else {
        console.log(2, '2');
        VideoHelper.setCurrentTime(this.innerVideo, time)
          .then(() => {
            this.canvasContext.drawImage(this.innerVideo, 0, 0, this.canvas.width, this.canvas.height);
            const dataURL = this.canvas.toDataURL();

            newThumbs.push({
              imageData: dataURL,
              time: Helper.round(time, 100),
              selected: VideoHelper.isCurrentTime(this.value, time, this.step),
            });

            recursivelyGetImages()
          });
      }
    };

    recursivelyGetImages();
  }
}
