import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVideoFragmentModel} from "../../../../services/models/video-fragment.service";
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

  private selectedVideoDuration: number;
  private showStartThumbs: boolean;

  constructor(private videoCutterService: VideoCutterService) { }

  ngOnInit() {
    if (!this.videoFragment) throw new Error('Input videoFragment is required');
    if (!this.video) throw new Error('Input video is required');

    this.renewSelectedVideoDuration();
  }

  onTimeChange(time) {
    this.renewSelectedVideoDuration();
    this.videoCutterService.startPlaySelectedVideoRecursively(time, time + 1);
    this.onFragmentChange.emit(this.videoFragment);
  }

  private onPlaySelectedClick() {
    this.videoCutterService.startPlaySelectedVideoRecursively(this.videoFragment.start, this.videoFragment.end);
  }


  private renewSelectedVideoDuration() {
    this.selectedVideoDuration = Helper.round(this.videoFragment.end - this.videoFragment.start);
  }
}
