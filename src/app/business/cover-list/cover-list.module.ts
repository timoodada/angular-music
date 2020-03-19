import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoverListComponent} from './cover-list.component';
import {PipeModule} from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    CoverListComponent
  ],
  exports: [
    CoverListComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ]
})
export class CoverListModule { }
