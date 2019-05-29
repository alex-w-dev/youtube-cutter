import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import {SearchPopularModule} from "./pages/search-popular/search-popular.module";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {ApiService} from "./services/api.service";
import {YoutubeService} from "./services/youtube.service";
import {VideoFragmentationModule} from "./pages/video-fragmentation/video-fragmentation.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
    HttpClientModule,


    // pages
    SearchPopularModule,
    VideoFragmentationModule,
  ],
  providers: [
    ApiService,
    YoutubeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
