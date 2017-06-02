// ~~ ANGULAR ======================

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// ~~ MATERIAL =====================

import 'hammerjs';
import { MdToolbarModule, MdCardModule, MdButtonModule, MdIconModule, MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ~~ COMPONENTS ===================

import { ChartComponent } from './chart/chart.component';
import { GoalsComponent } from './goals/goals.component';
import { LoginComponent } from './login/login.component';
import { PingComponent } from './ping/ping.component';
import { ShoesComponent } from './shoes/shoes.component';
import { StreaksComponent } from './streaks/streaks.component';

// ~~ UNORGANIZED ==================

import { HeaderComponent } from './header.component';
import { PageComponent } from './page.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile.component';
import { LogoutComponent } from './logout.component';
import { ConfirmDialog } from './dialog.component';  

import { LoginService } from "./login.service";
import { ProfileService } from "./profile.service";
import { DialogService } from './dialog.service';

import { authReducer } from './auth.reducer';
import { profileReducer } from './profile.reducer';
import { StoreModule } from '@ngrx/store';

import { requestOptionsProvider } from './request-options.service';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    PageComponent,
    MainComponent,
    ProfileComponent,
    LogoutComponent,
    PingComponent,
    StreaksComponent,
    ChartComponent,
    ShoesComponent,
    GoalsComponent,
    ConfirmDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdDialogModule,
    StoreModule.provideStore({
      auth: authReducer,
      profile: profileReducer
    })
  ],
  providers: [
    LoginService,
    ProfileService,
    DialogService,
    requestOptionsProvider
  ],
    entryComponents: [
        ConfirmDialog,
    ],
  bootstrap: [PageComponent]
})
export class AppModule { }
