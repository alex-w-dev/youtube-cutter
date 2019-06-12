import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import {SearchPopularModule} from "./pages/search-popular/search-popular.module";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {ApiService} from "./services/api.service";
import {YoutubeService} from "./services/models/youtube.service";
import {VideoFragmentationModule} from "./pages/video-fragmentation/video-fragmentation.module";
import {VideoCutterModule} from "./pages/video-cutter/video-cutter.module";
import {VideoFragmentService} from "./services/models/video-fragment.service";
import {VideoService} from "./services/models/video.service";
import {VideoListForReviewModule} from "./pages/video-list/video-list-for-review.module";
import {VideoTagService} from "./services/models/video-tag.service";
import { StaticModalWrapperComponent } from './shared/components/static-modal-wrapper/static-modal-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatButtonModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
    HttpClientModule,
    // MatButtonModule,


    // pages
    SearchPopularModule,
    VideoCutterModule,
    VideoFragmentationModule,
    VideoListForReviewModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ApiService,
    YoutubeService,
    VideoFragmentService,
    VideoService,
    VideoTagService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
