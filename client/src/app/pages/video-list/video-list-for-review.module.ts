import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListForReviewComponent } from './video-list-for-review.component';
import {NgxYoutubePlayerModule} from "ngx-youtube-player";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    VideoListForReviewComponent,
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule,
    FlexLayoutModule,
  ],
  exports: [
    VideoListForReviewComponent,
  ]
})
export class VideoListForReviewModule { }
