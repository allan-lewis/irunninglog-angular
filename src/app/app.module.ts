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

import { ChallengesComponent } from './challenges/challenges.component';
import { ChartComponent } from './chart/chart.component';
import { ConfirmComponent } from './confirm/confirm.component';  
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
import { SummaryComponent } from './summary/summary.component';
import { YearlyComponent } from './yearly/yearly.component';

// ~~ SERVICES =====================

import { AuthenticationService } from "./authentication/authentication.service";
import { ChallengesService } from "./challenges/challenges.service";
import { ConfirmService } from './confirm/confirm.service';
import { ProfileService } from './header/profile.service';
import { requestOptionsProvider } from './http/request-options.service';
import { PingService } from './ping/ping.service';
import { ShoesService } from './shoes/shoes.service';
import { StatisticsService } from './statistics/statistics.service';
import { StreaksService } from './streaks/streaks.service';

// ~~ REDUCERS =====================

import { authenticationModelReducer } from './state/authentication.reducer';
import { challengesModelReducer } from './state/challenges.reducer';
import { pingModelReducer } from './state/ping.reducer';
import { profileModelReducer } from './state/profile.reducer';
import { shoesModelReducer } from './state/shoes.reducer';
import { streaksModelReducer } from './state/streaks.reducer';
import { summaryModelReducer } from './state/summary.reducer';

// ~~ PIPES ========================

import { CommaSeparatedNumberPipe } from './pipe/comma.pipe';

@NgModule({
  declarations: [
    ChartComponent,
    CommaSeparatedNumberPipe,
    ConfirmComponent,
    ChallengesComponent,
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
    StreaksComponent,
    SummaryComponent,
    YearlyComponent
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
      challenges: challengesModelReducer,
      ping: pingModelReducer,
      profile: profileModelReducer,
      shoes: shoesModelReducer,
      streaks: streaksModelReducer,
      summary: summaryModelReducer
    })
  ],
  providers: [
    AuthenticationService,
    ChallengesService,
    ConfirmService,
    PingService,
    ProfileService,
    requestOptionsProvider,
    ShoesService,
    StatisticsService,
    StreaksService
  ],
    entryComponents: [
        ConfirmComponent,
    ],
  bootstrap: [ShellComponent]
})

export class AppModule { }
