import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {ValueAccessorBase} from "../../../../shared/classes/value-accessor-base";

@Component({
  selector: 'app-ranged-thumbs',
  templateUrl: 'ranged-thumbs.component.html',
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
  @Input() limit: number = 10;

  constructor() {
    super();
  }

  ngOnInit() {
    if(!this.video) throw new Error('Input video is required');
  }

  onThumbClicked(value) {
    this.value = value;
  }
}
