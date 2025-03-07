import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YoutubeService} from "../../services/models/youtube.service";
import {IVideoFragmentModel, VideoFragmentService} from "../../services/models/video-fragment.service";
import Helper from "../../shared/classes/helper";
import {ActivatedRoute} from "@angular/router";
import {VideoCutterService} from "./video-cutter.service";

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
  // @Input() videoId: string = '-rdm3sPKtIg'; - несмешно
  videoId: string; // длинное
  @ViewChild('video', { static: true }) videoElement;
  video: HTMLVideoElement;

  protected videoFragments: IVideoFragment[] = [];
  protected selectedVideoFragment: IVideoFragment;

  private selectedVideoDuration: number;
  private loadingProc: number = 0;
  private videoLoaded: boolean = false;

  private throttledSaveFragment: Function = Helper.throttle(this.saveFragment, 300);

  constructor(private youtubeService: YoutubeService,
              private videoFragmentService: VideoFragmentService,
              private activatedRoute: ActivatedRoute,
              private videoCutterService: VideoCutterService,
  ) {
  }

  ngOnInit() {
    this.videoId = this.activatedRoute.snapshot.params.yVideoId;
    this.video = this.videoElement.nativeElement;
    this.videoCutterService.video = this.video;
    this.youtubeService
      .getLowestVideo(this.videoId, (data) => {
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

  onAddNextFragmentClick(startTime: number) {
    this.videoCutterService.createNext(
      this.videoId,
      startTime,
    ).subscribe((videoFragmentModel) => {
      this.pushVideoFragment(videoFragmentModel);
    });
  }

  onAddPreviousFragmentClick(endTime: number) {
    this.videoCutterService.createPrevious(
      this.videoId,
      endTime,
    ).subscribe((videoFragmentModel) => {
      this.pushVideoFragment(videoFragmentModel);
    });
  }

  private pushVideoFragment(videoFragmentModel: IVideoFragmentModel) {
    const newVideoFragment = this.convertVideoFragmentToUIUsing(videoFragmentModel);
    this.videoFragments.push(newVideoFragment);
    this.toggleSelectedVideoFragment(newVideoFragment);
    this.reSortVideoFragments();
  }

  private onPlaySelectedClick() {
    this.videoCutterService.startPlaySelectedVideoRecursively(this.selectedVideoFragment.start, this.selectedVideoFragment.end);
  }

  onRemoveFragmentClick(v: IVideoFragment) {
    this.videoCutterService.stopVideoPlaying();

    this.videoCutterService.removeFragment(v).subscribe(() => {
      this.videoFragments = this.videoFragments.filter(videoFragment => videoFragment !== v);
      if (this.selectedVideoFragment === v) this.selectedVideoFragment = null;
    })
  }

  toggleSelectedVideoFragment(v: IVideoFragment) {
    this.selectedVideoFragment = v;
    this.video.currentTime = this.selectedVideoFragment.start;
  }

  updateVideoFragments() {
    if (!this.video) return new Error();

    this.videoFragmentService.getByYVideoId(this.videoId).subscribe(value => {
      this.videoFragments  = value.map(this.convertVideoFragmentToUIUsing.bind(this));
      this.reSortVideoFragments();
    })
  }

  onFragmentChange(v: IVideoFragment) {
    const converted = this.convertVideoFragmentToUIUsing(v);
    v.color = converted.color;
    v.left = converted.left;
    v.width = converted.width;

    this.renewSelectedVideoDuration();

    this.throttledSaveFragment(v);
  }

  private saveFragment(fragment: IVideoFragment) {
    this.videoFragmentService.upsert(fragment).subscribe(() => console.log('saved'))
  };

  private reSortVideoFragments() {
    this.videoFragments = this.videoFragments.sort(((a, b) => a.start - b.start))
  }

  private convertVideoFragmentToUIUsing(videoFragmentModel: IVideoFragmentModel): IVideoFragment {
    return {
      ...videoFragmentModel,
      color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
      width: `${ (videoFragmentModel.end - videoFragmentModel.start) / this.video.duration * 100 }%`,
      left: `${ videoFragmentModel.start / this.video.duration * 100 }%`,
    };
  }

  private renewSelectedVideoDuration() {
    this.selectedVideoDuration = Helper.round(this.selectedVideoFragment.end - this.selectedVideoFragment.start);
  }
}

