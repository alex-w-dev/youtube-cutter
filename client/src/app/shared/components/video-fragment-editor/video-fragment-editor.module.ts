import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFragmentEditorComponent } from './video-fragment-editor.component';


@NgModule({
  exports: [
    VideoFragmentEditorComponent,
  ],
  declarations: [
    VideoFragmentEditorComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class VideoFragmentEditorModule { }
