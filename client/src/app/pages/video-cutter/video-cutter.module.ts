import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCutterComponent } from './video-cutter.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {VideoFragmentEditorModule} from "../../shared/components/video-fragment-editor/video-fragment-editor.module";

@NgModule({
  declarations: [
    VideoCutterComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    VideoFragmentEditorModule,
  ],
  exports: [
    VideoCutterComponent,
  ]
})
export class VideoCutterModule { }
