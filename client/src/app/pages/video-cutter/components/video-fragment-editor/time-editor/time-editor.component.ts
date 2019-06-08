import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {VideoCutterService} from "../../../video-cutter.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "../../../../../shared/classes/value-accessor-base";

@Component({
  selector: 'app-time-editor',
  templateUrl: 'time-editor.component.html',
  styleUrls: ['time-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeEditorComponent),
      multi: true,
    }
  ]
})

export class TimeEditorComponent extends ValueAccessorBase<number> implements OnInit {
  @Input() minTime: number;
  @Input() maxTime: number;
  @Input() video: HTMLVideoElement;

  constructor() {
      super();
    }

  ngOnInit() {
    if (!this.video) throw new Error('Input video is required');
    if (this.maxTime <= this.minTime) throw new Error('Input maxTime must be greater than minTime');

    this.registerOnChange((value) => {
      // if (this.minTime > value) {
      //   this.value = this.minTime;
      // }
      // if (this.maxTime < value) {
      //   this.value = this.maxTime;
      // }
    })
  }
}
