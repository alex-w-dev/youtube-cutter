import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPopularComponent } from './search-popular.component';
import {NgxYoutubePlayerModule} from "ngx-youtube-player";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    SearchPopularComponent,
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule,
    FlexLayoutModule,
  ],
  exports: [
    SearchPopularComponent,
  ]
})
export class SearchPopularModule { }
