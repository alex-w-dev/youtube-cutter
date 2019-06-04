import {Component, Input, OnInit} from '@angular/core';
import {IVideoFragment} from "../video-cutter.component";

@Component({
  selector: 'app-fragment-scale',
  templateUrl: './fragment-scale.component.html',
  styleUrls: ['./fragment-scale.component.scss'],
})

export class FragmentScaleComponent implements OnInit {
  @Input() videoFragment: IVideoFragment;
  @Input() videoFragments: IVideoFragment[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.videoFragment) this.videoFragments = [this.videoFragment];
  }
}
