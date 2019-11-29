import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingComponent} from './setting.component';
import {PasswordComponent} from './password/password.component';

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  children: [{
    path: 'password',
    component: PasswordComponent
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
