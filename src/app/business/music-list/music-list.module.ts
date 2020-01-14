import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MusicListComponent} from './music-list.component';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {LayoutModule} from '../../components/layout/layout.module';
import {LoadingModule} from '../../components/loading/loading.module';
import {PureMusicListModule} from '../pure-music-list/pure-music-list.module';
import {EmptyModule} from '../../components/empty/empty.module';

@NgModule({
  declarations: [
    MusicListComponent
  ],
    imports: [
        CommonModule,
        ScrollYModule,
        LayoutModule,
        LoadingModule,
        PureMusicListModule,
        EmptyModule
    ],
  exports: [
    MusicListComponent
  ]
})
export class MusicListModule { }
