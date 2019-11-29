import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {SettingRoutingModule} from './setting-routing.module';
import {SettingComponent} from './setting.component';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from './password/password.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    SettingComponent,
    PasswordComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule
  ]
})
export class SettingModule {}
