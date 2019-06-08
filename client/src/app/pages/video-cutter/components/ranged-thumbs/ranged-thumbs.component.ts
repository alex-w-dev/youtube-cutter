import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "../../../../shared/classes/value-accessor-base";
import Helper from "../../../../shared/classes/helper";

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
  private lastRenewThumbsRequest: number;

  private throttledRenewThumbs: Function = Helper.throttle(this.renewThumbs, 500);

  constructor() {
    super();
  }

  ngOnInit() {
    if(!this.video) throw new Error('Input video is required');

    this.innerVideo = <HTMLVideoElement>this.video.cloneNode(true);

    this.innerVideo.addEventListener('loadedmetadata', () => {
      this.canvas.width = this.video.videoWidth / 5;
      this.canvas.height = this.video.videoHeight / 5;

      this.registerOnChange((value) => {
        this.throttledRenewThumbs();
      });
      this.renewThumbs();
    })
  }

  onThumbClicked(value) {
    this.value = value;
  }

  private renewThumbs() {
    const selfRenewThumbsRequest = Date.now();
    this.lastRenewThumbsRequest = selfRenewThumbsRequest;
    const newThumbs = [];
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
      return new Promise((res, rej) => {
        if (this.lastRenewThumbsRequest !== selfRenewThumbsRequest) return rej();

        const time = timeArray[i++];

        if (time === undefined) {
          res();
        } else {
          const onTimeUpdate = () => {
            this.innerVideo.removeEventListener('timeupdate', onTimeUpdate);
            this.canvasContext.drawImage(this.innerVideo, 0, 0, this.canvas.width, this.canvas.height);
            const dataURL = this.canvas.toDataURL();

            // todo redo
            const selected = (() => {
              let a = 1;
              if (this.step === 0.1) a = 10;
              if (this.step === 0.01) a = 100;
              const b = Math.floor(time * a);
              const c = Math.floor(this.value * a);
              return Math.round(Math.abs(c - b ))  === 0;
            })();

            newThumbs.push({
              imageData: dataURL,
              time: Helper.round(time, 100),
              selected: selected,
            });
            res(recursivelyGetImages());
          };
          this.innerVideo.addEventListener('timeupdate', onTimeUpdate);
          this.innerVideo.currentTime = time;
        }
      });
    };

    recursivelyGetImages()
      .then(() => {
        this.thumbs = newThumbs;
        this.lastRenewThumbsRequest = null;
      })
      .catch(() => {
        console.log('wait more');
      });
  }
}
