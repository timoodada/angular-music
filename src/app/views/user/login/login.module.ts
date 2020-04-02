import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {LayoutModule} from '../../../components/layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from '../../../components/button/button.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule
    ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
