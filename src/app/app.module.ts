import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { HeaderComponent } from './header.component';
import { PageComponent } from './page.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdToolbarModule, MdCardModule, MdButtonModule} from '@angular/material';

import 'hammerjs';

import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import {AuthService} from "./auth.service";

import {authReducer} from './auth.reducer';
import { StoreModule } from '@ngrx/store';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    HeaderComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    StoreModule.provideStore({
      auth: authReducer
    })
  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [PageComponent]
})
export class AppModule { }
