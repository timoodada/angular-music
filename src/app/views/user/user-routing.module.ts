import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {LayoutModule} from '../../components/layout/layout.module';
import {SwitchModule} from '../../components/switch/switch.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {PureMusicListModule} from '../../business/pure-music-list/pure-music-list.module';
import {EmptyModule} from '../../components/empty/empty.module';
import {LoginModule} from './login/login.module';
import {LoginComponent} from './login/login.component';
import {RouterAnimationModule} from '../../components/router-animation/router-animation.module';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'login',
    component: LoginComponent
  }]
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
    EmptyModule,
    LoginModule,
    RouterAnimationModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserRoutingModule {
}
