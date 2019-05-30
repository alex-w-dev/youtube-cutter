import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YoutubeService} from "../../services/youtube.service";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-video-fragmentation',
  templateUrl: './video-fragmentation.component.html',
  styleUrls: ['./video-fragmentation.component.scss']
})
export class VideoFragmentationComponent implements OnInit {
  @Input() videoId: string = '-rdm3sPKtIg';
  @ViewChild('video') videoElement;

  private videoUrl: string;

  constructor(private youtubeService: YoutubeService, private apiService: ApiService) { }

  ngOnInit() {
    this.videoUrl = this.youtubeService.getLowestVideoUrl(this.videoId);
    this.youtubeService.getLowestVideo(this.videoId).subscribe((videoData) => {
      this.videoElement.nativeElement.src = videoData;

      this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
        console.log(this.videoElement.nativeElement.videoWidth, 'this.videoElement.nativeElement.videoWidth');
        console.log(this.videoElement.nativeElement.videoHeight, 'this.videoElement.nativeElement.videoHeight');
      })
      // this.videoElement.nativeElement.play();
    });
  }
}
