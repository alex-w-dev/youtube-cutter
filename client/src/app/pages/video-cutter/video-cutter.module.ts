import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCutterComponent } from './video-cutter.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {FragmentScaleComponent} from "./components/fragment-scale/fragment-scale.component";
import {VideoFragmentEditorComponent} from "./components/video-fragment-editor/video-fragment-editor.component";
import {RangedThumbsComponent} from "./components/ranged-thumbs/ranged-thumbs.component";
import {VideoCutterService} from "./video-cutter.service";
import {TimeEditorComponent} from "./components/video-fragment-editor/time-editor/time-editor.component";

@NgModule({
  declarations: [
    VideoCutterComponent,
    FragmentScaleComponent,
    VideoFragmentEditorComponent,
    RangedThumbsComponent,
    TimeEditorComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    VideoCutterComponent,
  ],
  providers: [
    VideoCutterService,
  ]
})
export class VideoCutterModule { }
