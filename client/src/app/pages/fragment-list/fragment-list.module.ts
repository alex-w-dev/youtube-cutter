import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FragmentListComponent} from "./fragment-list.component";
import {MatTableDataSource, MatTableModule} from "@angular/material";

@NgModule({
  declarations: [
    FragmentListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class FragmentListModule { }
