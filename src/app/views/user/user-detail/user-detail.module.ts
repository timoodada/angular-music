import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserDetailComponent} from './user-detail.component';
import {LayoutModule} from '../../../components/layout/layout.module';
import {ButtonModule} from '../../../components/button/button.module';


@NgModule({
  declarations: [
    UserDetailComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        ButtonModule
    ],
  exports: [
    UserDetailComponent
  ]
})
export class UserDetailModule { }
