import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVideoFragmentModel, VideoFragmentService} from "../../../../services/models/video-fragment.service";
import {VideoCutterService} from "../../video-cutter.service";
import Helper from "../../../../shared/classes/helper";

@Component({
  selector: 'app-video-fragment-editor',
  templateUrl: './video-fragment-editor.component.html',
  styleUrls: ['./video-fragment-editor.component.scss']
})
export class VideoFragmentEditorComponent implements OnInit {
  @Input() videoFragment: IVideoFragmentModel;
  @Input() video: HTMLVideoElement;
  @Output() onFragmentChange: EventEmitter<IVideoFragmentModel> = new EventEmitter();

  constructor(
    private videoCutterService: VideoCutterService,
  ) { }

  ngOnInit() {
    if (!this.videoFragment) throw new Error('Input videoFragment is required');
    if (!this.video) throw new Error('Input video is required');
  }

  onTimeChange(time) {
    this.videoCutterService.startPlaySelectedVideoRecursively(time, time + 1);
    this.onFragmentChange.emit(this.videoFragment);
  }
}
