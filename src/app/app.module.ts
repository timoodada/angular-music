/*
* ng generate <type> <filePath> --skip-import
* use --skip-import to prevent updating this file
*/
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {AnimationModule} from './components/animation/animation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AsyncLoadComponent} from './components/async-load/async-load.component';
import {LayoutModule} from './components/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    AsyncLoadComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AnimationModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
