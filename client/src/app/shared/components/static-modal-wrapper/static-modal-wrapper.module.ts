import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticModalWrapperComponent} from "./static-modal-wrapper.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    StaticModalWrapperComponent,
  ],
  exports: [
    StaticModalWrapperComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ]
})
export class StaticModalWrapperModule { }
