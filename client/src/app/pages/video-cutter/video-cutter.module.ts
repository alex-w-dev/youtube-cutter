import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCutterComponent } from './video-cutter.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    VideoCutterComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports: [
    VideoCutterComponent,
  ]
})
export class VideoCutterModule { }
