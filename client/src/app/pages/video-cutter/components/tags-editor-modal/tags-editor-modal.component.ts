import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IVideoFragmentModel} from "../../../../services/models/video-fragment.service";
import {VideoTagService} from "../../../../services/models/video-tag.service";

@Component({
  selector: 'app-tags-editor',
  templateUrl: './tags-editor-modal.component.html',
  styleUrls: ['./tags-editor-modal.component.scss']
})
export class TagsEditorModalComponent implements OnInit {
  @Input() videoFragment: IVideoFragmentModel;
  @Output() changed: EventEmitter<void> = new EventEmitter();

  private tagNames: string[] = [];
  private newTagName: string = '';

  constructor(private videoTagService: VideoTagService) { }

  ngOnInit() {
    this.reloadTags();
  }

  reloadTags() {
    this.videoTagService.find().subscribe((res) => {
      this.tagNames = res.map(t => t.name);
    })
  }

  isTagAdded(tagName: string): boolean {
    return this.videoFragment.tagNames.includes(tagName);
  }

  onTagClick(tagName: string) {
    if (this.isTagAdded(tagName)) {
      this.videoFragment.tagNames = this.videoFragment.tagNames.filter(t => t !== tagName);
    } else {
      this.videoFragment.tagNames.push(tagName);
    }

    this.changed.next();
  }

  onCreateNewTagClick() {
    if (!this.newTagName) return alert('Tag Name is Undefined');
    if (this.tagNames.includes(this.newTagName)) return alert('Tag Name is Already Exists');

    this.videoTagService.create({
      name: this.newTagName,
    }).subscribe(() => {
      this.reloadTags();
      this.newTagName = '';
    })
  }
}
