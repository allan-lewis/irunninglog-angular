// ~~ ANGULAR ======================

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// ~~ MATERIAL =====================

import 'hammerjs';
import { MdToolbarModule, MdCardModule, MdButtonModule, MdIconModule, MdDialogModule, MdProgressBarModule } from '@angular/material';
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
import { PingComponent, PingGoodComponent, PingBadComponent } from './ping/ping.component';
import { ProgressCardComponent } from './progress/progress-card.component';
import { ShellComponent } from './shell/shell.component';
import { ShoesComponent } from './shoes/shoes.component';
import { StreaksComponent } from './streaks/streaks.component';

// ~~ SERVICES =====================

import { AuthenticationService } from "./authentication/authentication.service";
import { ConfirmService } from './confirm/confirm.service';
import { ProfileService } from './header/profile.service';
import { requestOptionsProvider } from './http/request-options.service';
import { PingService } from './ping/ping.service';
import { ShoesService } from './shoes/shoes.service';
import { StreaksService } from './streaks/streaks.service';

// ~~ REDUCERS =====================

import { authenticationModelReducer } from './state/authentication.reducer';
import { pingModelReducer } from './state/ping.reducer';
import { profileModelReducer } from './state/profile.reducer';
import { shoesModelReducer } from './state/shoes.reducer';
import { streaksModelReducer } from './state/streaks.reducer';

// ~~ PIPES ========================

import { CommaSeparatedNumberPipe } from './pipe/comma.pipe';

@NgModule({
  declarations: [
    ChartComponent,
    CommaSeparatedNumberPipe,
    ConfirmComponent,
    GoalsComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    PageComponent,
    PingComponent,
    PingBadComponent,
    PingGoodComponent,
    ProfileComponent,
    ProgressCardComponent,
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
    MdProgressBarModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    StoreModule.provideStore({
      authentication: authenticationModelReducer,
      ping: pingModelReducer,
      profile: profileModelReducer,
      shoes: shoesModelReducer,
      streaks: streaksModelReducer
    })
  ],
  providers: [
    AuthenticationService,
    ConfirmService,
    PingService,
    ProfileService,
    requestOptionsProvider,
    ShoesService,
    StreaksService
  ],
    entryComponents: [
        ConfirmComponent,
    ],
  bootstrap: [ShellComponent]
})

export class AppModule { }
