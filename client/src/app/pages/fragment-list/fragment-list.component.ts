import { Component, OnInit } from '@angular/core';
import {IVideoFragmentModel, VideoFragmentService} from "../../services/models/video-fragment.service";

@Component({
  selector: 'app-fragment-list',
  templateUrl: './fragment-list.component.html',
  styleUrls: ['./fragment-list.component.scss']
})
export class FragmentListComponent implements OnInit {

  fragments: IVideoFragmentModel[];

  displayedColumns: string[] = ['id', 'yVideoId', 'tagNames', 'grade'];

  constructor(
    private videoFragmentService: VideoFragmentService,
    ) { }

  ngOnInit() {
    this.videoFragmentService.find().subscribe(data => this.fragments = data)
  }

  loadData() {

  }

}
