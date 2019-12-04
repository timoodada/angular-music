import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListPipe} from './list.pipe';


@NgModule({
  declarations: [
    ListPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListPipe
  ]
})
export class PipeModule { }
