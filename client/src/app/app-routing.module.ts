import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoListForReviewComponent} from "./pages/video-list/video-list-for-review.component";
import {VideoCutterComponent} from "./pages/video-cutter/video-cutter.component";
import {SearchPopularComponent} from "./pages/search-popular/search-popular.component";

const routes: Routes = [{
  component: VideoListForReviewComponent,
  path: 'videos-for-review',
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'videos-for-review',
}, {
  path: 'new-popular',
  component: SearchPopularComponent,
}, {
  path: 'video-cutter/:yVideoId',
  component: VideoCutterComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
