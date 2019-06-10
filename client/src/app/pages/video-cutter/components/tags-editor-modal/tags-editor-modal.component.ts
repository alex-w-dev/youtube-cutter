import {Component, Input, OnInit} from '@angular/core';
import {IVideoFragmentModel} from "../../../../services/models/video-fragment.service";

@Component({
  selector: 'app-tags-editor-modal',
  templateUrl: './tags-editor-modal.component.html',
  styleUrls: ['./tags-editor-modal.component.scss']
})
export class TagsEditorModalComponent implements OnInit {
  @Input() videoFragment: IVideoFragmentModel

  constructor() { }

  ngOnInit() {
  }

}
