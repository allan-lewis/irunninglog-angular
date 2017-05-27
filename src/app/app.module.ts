import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { HeaderComponent } from './header.component';
import { LoginComponent } from './login.component';
import { PageComponent } from './page.component';
import { MainComponent } from './main.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdToolbarModule, MdCardModule, MdButtonModule} from '@angular/material';

import 'hammerjs';

import {LoginService} from "./login.service";

import {authReducer} from './auth.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    PageComponent,
    MainComponent
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
    LoginService
  ],
  bootstrap: [PageComponent]
})
export class AppModule { }
