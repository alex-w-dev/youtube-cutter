import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListForReviewComponent } from './video-list-for-review.component';
import {NgxYoutubePlayerModule} from "ngx-youtube-player";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    VideoListForReviewComponent,
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule,
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [
    VideoListForReviewComponent,
  ]
})
export class VideoListForReviewModule { }
