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
import { ConfirmComponent } from './confirm/confirm.component';  
import { GoalsComponent } from './goals/goals.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './header/logout.component';
import { ProfileComponent } from './header/profile.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { PingComponent } from './ping/ping.component';
import { ShellComponent } from './shell/shell.component';
import { ShoesComponent } from './shoes/shoes.component';
import { StreaksComponent } from './streaks/streaks.component';

// ~~ SERVICES =====================

import { AuthenticationService } from "./authentication/authentication.service";
import { ConfirmService } from './confirm/confirm.service';
import { ProfileService } from './header/profile.service';
import { requestOptionsProvider } from './http/request-options.service';

// ~~ REDUCERS =====================

import { authenticationModelReducer } from './state/authentication.reducer';
import { profileModelReducer } from './state/profile.reducer';

@NgModule({
  declarations: [
    ChartComponent,
    ConfirmComponent,
    GoalsComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    PageComponent,
    PingComponent,
    ProfileComponent,
    ShellComponent,
    ShoesComponent,
    StreaksComponent
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
    ConfirmService,
    ProfileService,
    requestOptionsProvider
  ],
    entryComponents: [
        ConfirmComponent,
    ],
  bootstrap: [ShellComponent]
})

export class AppModule { }
