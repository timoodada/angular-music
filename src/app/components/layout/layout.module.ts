import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {BackComponent} from './back/back.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    BackComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    BackComponent
  ]
})
export class LayoutModule {
}
