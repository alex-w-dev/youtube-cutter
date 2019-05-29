import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFragmentationComponent } from './video-fragmentation.component';
import {NgxYoutubePlayerModule} from "ngx-youtube-player";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    VideoFragmentationComponent,
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule,
    FlexLayoutModule,
  ],
  exports: [
    VideoFragmentationComponent,
  ]
})
export class VideoFragmentationModule { }
