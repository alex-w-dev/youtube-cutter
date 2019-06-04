import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {IVideoFragment} from "../video-cutter.component";

@Component({
  selector: 'app-fragment-scale',
  templateUrl: './fragment-scale.component.html',
  styleUrls: ['./fragment-scale.component.scss'],
})

export class FragmentScaleComponent implements OnInit {
  @Input() videoFragment: IVideoFragment;
  @Input() videoFragments: IVideoFragment[] = [];
  @Output() onScaleClick: EventEmitter<IVideoFragment> = new EventEmitter();
  @HostListener('click') onSelfClick = () => {
    if (this.videoFragments.length === 1) {
      this.onScaleClick.emit(this.videoFragments[0]);
    }
  };

  constructor() {
  }

  ngOnInit() {
    if (this.videoFragment) this.videoFragments = [this.videoFragment];
  }

  scaleClick(event, fragment: IVideoFragment) {
    event.preventDefault();
    event.stopPropagation();

    this.onScaleClick.emit(fragment);
  }
}
