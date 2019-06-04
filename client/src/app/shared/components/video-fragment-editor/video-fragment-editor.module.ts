import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFragmentEditorComponent } from './video-fragment-editor.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";


@NgModule({
  exports: [
    VideoFragmentEditorComponent,
  ],
  declarations: [
    VideoFragmentEditorComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
  ]
})
export class VideoFragmentEditorModule { }
