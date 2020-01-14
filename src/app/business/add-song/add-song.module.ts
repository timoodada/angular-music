import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddSongComponent} from './add-song.component';
import {PureMusicListModule} from '../pure-music-list/pure-music-list.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {SwitchModule} from '../../components/switch/switch.module';
import {EmptyModule} from '../../components/empty/empty.module';

@NgModule({
  declarations: [
    AddSongComponent
  ],
  imports: [
    CommonModule,
    ScrollYModule,
    PureMusicListModule,
    SwitchModule,
    EmptyModule
  ],
  exports: [
    AddSongComponent
  ]
})
export class AddSongModule { }
