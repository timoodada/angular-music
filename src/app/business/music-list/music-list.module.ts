import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MusicListComponent} from './music-list.component';
import {PureMusicListComponent} from './pure-music-list/pure-music-list.component';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {LayoutModule} from '../../components/layout/layout.module';
import {LoadingModule} from '../../components/loading/loading.module';

@NgModule({
  declarations: [
    MusicListComponent,
    PureMusicListComponent
  ],
    imports: [
        CommonModule,
        ScrollYModule,
        LayoutModule,
        LoadingModule
    ],
  exports: [
    MusicListComponent,
    PureMusicListComponent
  ]
})
export class MusicListModule { }
