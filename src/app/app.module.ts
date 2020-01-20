/*
* ng generate <type> <filePath> --skip-import
* use --skip-import to prevent updating this file
*/
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {RouterAnimationModule} from './components/router-animation/router-animation.module';
import {PlayerModule} from './business/player/player.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from './components/layout/layout.module';
import {LoadingModule} from './components/loading/loading.module';
import {ModalModule} from './components/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterAnimationModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LayoutModule,
    PlayerModule,
    LoadingModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
