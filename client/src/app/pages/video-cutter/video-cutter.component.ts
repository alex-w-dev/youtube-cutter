import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YoutubeService} from "../../services/models/youtube.service";
import {ApiService} from "../../services/api.service";
import {IVideoFragmentModel, VideoFragmentService} from "../../services/models/video-fragment.service";
import Helper from "../../shared/classes/helper";
import {ActivatedRoute} from "@angular/router";

interface IThumbnail {
  time: number;
  data: string;
  selected?: boolean;
}

export interface IVideoFragment extends IVideoFragmentModel{
  color: string;
  width: string;
  left: string;
}

@Component({
  selector: 'app-video-cutter',
  templateUrl: './video-cutter.component.html',
  styleUrls: ['./video-cutter.component.scss']
})
export class VideoCutterComponent implements OnInit {
  // @Input() videoId: string = 'UFZ_EE3dH4c'; // клоун
  // @Input() videoId: string = '-rdm3sPKtIg'; - не смешно
  @Input() videoId: string = 'YE7VzlLtp-4'; // длинное
  @ViewChild('video', { static: true }) videoElement;
  video: HTMLVideoElement;

  protected videoFragments: IVideoFragment[] = [];
  protected selectedVideoFragment: IVideoFragment;

  private loadingProc: number = 0;
  private videoLoaded: boolean = false;

  private throttledSaveFragment: Function = Helper.throttle(this.saveFragment, 300);

  constructor(private youtubeService: YoutubeService,
              private videoFragmentService: VideoFragmentService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    this.youtubeService
      .getLowestVideo(this.activatedRoute.snapshot.params.yVideoId, (data) => {
        console.log(data, '----');
        this.loadingProc = Math.round(data.loaded / data.total * 100);
      })
      .subscribe((videoData) => {
        this.video.src = videoData;

        this.video.addEventListener('loadedmetadata', () => {
          this.videoLoaded = true;

          this.updateVideoFragments();
        })
        // this.video.play();
      });
  }

  onAddFragmentClick() {
    this.videoFragmentService
      .create({
        end: this.video.duration,
        start: 0,
        yVideoId: this.videoId,
      })
      .subscribe(videoFragmentModel => {
        this.videoFragments.push(this.convertVideoFragmentToUIUsing(videoFragmentModel));
      })
  }

  onRemoveFragmentClick(v: IVideoFragment) {
    if (confirm('Really Delete?')) {
      this.videoFragmentService
        .delete(v.id)
        .subscribe(() => {
          this.videoFragments = this.videoFragments.filter(videoFragment => videoFragment !== v);
        })
    }
  }

  toggleSelectedVideoFragment(v: IVideoFragment) {
    this.selectedVideoFragment = v;
  }

  updateVideoFragments() {
    if (!this.video) return new Error();

    this.videoFragmentService.getByYVideoId(this.videoId).subscribe(value => {
      this.videoFragments  = value.map(this.convertVideoFragmentToUIUsing.bind(this))
    })
  }

  onFragmentChange(v: IVideoFragment) {
    const converted = this.convertVideoFragmentToUIUsing(v);
    v.color = converted.color;
    v.left = converted.left;
    v.width = converted.width;

    this.throttledSaveFragment(v);
  }

  private saveFragment(fragment: IVideoFragment) {
    this.videoFragmentService.upsert(fragment).subscribe(() => console.log('saved'))
  };

  private convertVideoFragmentToUIUsing(videoFragmentModel: IVideoFragmentModel): IVideoFragment {
    return {
      ...videoFragmentModel,
      color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
      width: `${ (videoFragmentModel.end - videoFragmentModel.start) / this.video.duration * 100 }%`,
      left: `${ videoFragmentModel.start / this.video.duration * 100 }%`,
    };
  }
}

