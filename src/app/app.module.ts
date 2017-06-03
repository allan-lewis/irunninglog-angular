// ~~ ANGULAR ======================

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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

// ~~ SERVICES =====================

import { AuthenticationService } from "./authentication/authentication.service";

// ~~ REDUCERS =====================

import { authenticationModelReducer } from './authentication/authentication.reducer';

// ~~ UNORGANIZED ==================

import { HeaderComponent } from './header.component';
import { PageComponent } from './page.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile.component';
import { LogoutComponent } from './logout.component';
import { ConfirmDialog } from './dialog.component';  

import { ProfileService } from "./profile.service";
import { DialogService } from './dialog.service';

import { profileReducer } from './profile.reducer';
import { StoreModule } from '@ngrx/store';

import { requestOptionsProvider } from './request-options.service';

@NgModule({
  declarations: [
    ChartComponent,
    GoalsComponent,
    LoginComponent,
    PingComponent,
    ShoesComponent,
    StreaksComponent,

    HeaderComponent,
    PageComponent,
    MainComponent,
    ProfileComponent,
    LogoutComponent,
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
      profile: profileReducer
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
