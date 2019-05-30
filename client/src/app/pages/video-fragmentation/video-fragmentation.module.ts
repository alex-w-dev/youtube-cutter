import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFragmentationComponent } from './video-fragmentation.component';
import {NgxYoutubePlayerModule} from "ngx-youtube-player";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    VideoFragmentationComponent,
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    VideoFragmentationComponent,
  ]
})
export class VideoFragmentationModule { }
