// ~~ ANGULAR ======================

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// ~~ MATERIAL =====================

import 'hammerjs';
import { MdToolbarModule, MdCardModule, MdButtonModule, MdIconModule, MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ~~ NGRX =========================

import { StoreModule } from '@ngrx/store';

// ~~ COMPONENTS ===================

import { ChartComponent } from './chart/chart.component';
import { GoalsComponent } from './goals/goals.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './header/logout.component';
import { ProfileComponent } from './header/profile.component';
import { LoginComponent } from './login/login.component';
import { PingComponent } from './ping/ping.component';
import { ShoesComponent } from './shoes/shoes.component';
import { StreaksComponent } from './streaks/streaks.component';

// ~~ SERVICES =====================

import { AuthenticationService } from "./authentication/authentication.service";
import { ProfileService } from './header/profile.service';

// ~~ REDUCERS =====================

import { authenticationModelReducer } from './state/authentication.reducer';
import { profileModelReducer } from './state/profile.reducer';

// ~~ UNORGANIZED ==================

import { PageComponent } from './page.component';
import { MainComponent } from './main.component';
import { ConfirmDialog } from './dialog.component';  

import { DialogService } from './dialog.service';

import { requestOptionsProvider } from './request-options.service';

@NgModule({
  declarations: [
    ChartComponent,
    GoalsComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    PingComponent,
    ProfileComponent,
    ShoesComponent,
    StreaksComponent,

    PageComponent,
    MainComponent,
    ConfirmDialog
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,  
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,  
    MdToolbarModule,
    BrowserAnimationsModule,
    StoreModule.provideStore({
      authentication: authenticationModelReducer,
      profile: profileModelReducer
    })
  ],
  providers: [
    AuthenticationService,
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
