import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PureMusicListComponent} from './pure-music-list.component';


@NgModule({
  declarations: [
    PureMusicListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PureMusicListComponent
  ]
})
export class PureMusicListModule { }
