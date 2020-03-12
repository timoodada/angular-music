import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from './detail.component';
import {MusicListModule} from '../../../business/music-list/music-list.module';


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    MusicListModule
  ],
  exports: [
    DetailComponent
  ]
})
export class SingerDetailModule { }
