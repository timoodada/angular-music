import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {LayoutModule} from '../../components/layout/layout.module';
import {SwitchModule} from '../../components/switch/switch.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {PureMusicListModule} from '../../business/pure-music-list/pure-music-list.module';
import {EmptyModule} from '../../components/empty/empty.module';

const routes: Routes = [{
  path: '',
  component: UserComponent
}];

@NgModule({
  declarations: [
    UserComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        SwitchModule,
        ScrollYModule,
        PureMusicListModule,
        EmptyModule
    ],
  exports: [
    UserComponent
  ]
})
export class UserRoutingModule { }
