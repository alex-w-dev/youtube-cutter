import {Component, Input, OnInit} from '@angular/core';
import {IVideoFragmentModel} from "../../../services/models/video-fragment.service";

@Component({
  selector: 'app-video-fragment-editor',
  templateUrl: './video-fragment-editor.component.html',
  styleUrls: ['./video-fragment-editor.component.scss']
})
export class VideoFragmentEditorComponent implements OnInit {
  @Input() videoFragment: IVideoFragmentModel;

  constructor() { }

  ngOnInit() {
  }

}
