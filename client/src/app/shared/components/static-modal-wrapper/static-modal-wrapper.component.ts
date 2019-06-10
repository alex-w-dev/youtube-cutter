import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-static-modal-wrapper',
  templateUrl: './static-modal-wrapper.component.html',
  styleUrls: ['./static-modal-wrapper.component.scss']
})
export class StaticModalWrapperComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onWallClick() {
    this.close.emit();
  }

  onCloseClick() {
    this.close.emit();
  }
}
