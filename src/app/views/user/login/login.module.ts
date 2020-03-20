import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {LayoutModule} from '../../../components/layout/layout.module';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from '../../../components/button/button.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        FormsModule,
        ButtonModule
    ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
