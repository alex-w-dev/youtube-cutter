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
  @Input() set videoFragment(value: IVideoFragmentModel) {
    this._videoFragment = value;
    this.lastVideoFragmentSettedTime = Date.now();
  }
  get videoFragment(): IVideoFragmentModel {
    return this._videoFragment;
  }
  private _videoFragment: IVideoFragmentModel;
  @Input() video: HTMLVideoElement;
  @Output() onFragmentChange: EventEmitter<IVideoFragmentModel> = new EventEmitter();

  private lastVideoFragmentSettedTime: number = 0;
  private tagsEditing: boolean = false;

  constructor(
    private videoCutterService: VideoCutterService,
  ) { }

  ngOnInit() {
    if (!this._videoFragment) throw new Error('Input videoFragment is required');
    if (!this.video) throw new Error('Input video is required');
  }

  onTimeChange(time) {
    if (this.lastVideoFragmentSettedTime + 1000 > Date.now()) return;

    this.videoCutterService.startPlaySelectedVideoRecursively(time, time + 1);
    this.onFragmentChange.emit(this._videoFragment);
  }
}
