import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ranged-thumbs',
  templateUrl: 'ranged-thumbs.component.html'
})

export class RangedThumbsComponent implements OnInit {
  @Input() video: HTMLVideoElement;
  @Input() step: number = 0.1;
  @Input() currentTime: number = 0;

  constructor() {
  }

  ngOnInit() {
    if(!this.video) throw new Error('Input video is required');
  }
}
