// ~~ ANGULAR ======================

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// ~~ MATERIAL =====================

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

// ~~ NGRX =========================

import { StoreModule } from '@ngrx/store';

// ~~ COMPONENTS ===================

import { ChallengesComponent } from './challenges/challenges.component';
import { ConfirmComponent } from './confirm/confirm.component';  
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './header/logout.component';
import { ProfileComponent } from './header/profile.component';
import { CompositeChartComponent } from './chart/composite-chart.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { PingComponent } from './ping/ping.component';
import { ProgressCardComponent } from './progress/progress-card.component';
import { ProgressListComponent } from './progress/progress-list.component';
import { ShellComponent } from './shell/shell.component';
import { ShoesComponent } from './shoes/shoes.component';
import { StreaksComponent } from './streaks/streaks.component';
import { SummaryComponent } from './summary/summary.component';
import { YearlyComponent } from './yearly/yearly.component';
import { YearlyTotalComponent } from './yearly/yearly-total.component';

// ~~ SERVICES =====================

import { AuthenticationService } from "./authentication/authentication.service";
import { ChallengesService } from "./challenges/challenges.service";
import { ConfirmService } from './confirm/confirm.service';
import { ProfileService } from './header/profile.service';
import { requestOptionsProvider } from './http/request-options.service';
import { PingService } from './ping/ping.service';
import { ProgressListService } from './progress/progress-list.service';
import { ShoesService } from './shoes/shoes.service';
import { Scheduler, IntervalScheduler } from './service/abstract-timed-http.service';
import { StatisticsService } from './statistics/statistics.service';
import { StreaksService } from './streaks/streaks.service';

// ~~ REDUCERS =====================

import { authenticationModelReducer } from './state/authentication.reducer';
import { challengesModelReducer } from './state/challenges.reducer';
import { dataSetModelReducer } from './state/data-set.reducer';
import { pingModelReducer } from './state/ping.reducer';
import { profileModelReducer } from './state/profile.reducer';
import { progressListReducer } from './state/progress-list.reducer';
import { shoesModelReducer } from './state/shoes.reducer';
import { streaksModelReducer } from './state/streaks.reducer';
import { summaryModelReducer } from './state/summary.reducer';
import { yearlyTotalModelReducer } from './state/yearly-total.reducer'; 

// ~~ PIPES ========================

import { CommaSeparatedNumberPipe } from './pipe/comma.pipe';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class MyMaterialModule {};

@NgModule({
  declarations: [
    CommaSeparatedNumberPipe,
    ConfirmComponent,
    ChallengesComponent,
    HeaderComponent,
    CompositeChartComponent,
    LoginComponent,
    LogoutComponent,
    PageComponent,
    PingComponent,
    ProfileComponent,
    ProgressCardComponent,
    ProgressListComponent,
    ShellComponent,
    ShoesComponent,
    StreaksComponent,
    SummaryComponent,
    YearlyComponent,
    YearlyTotalComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule, 
    MyMaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      authentication: authenticationModelReducer,
      challenges: challengesModelReducer,
      dataSet: dataSetModelReducer,
      ping: pingModelReducer,
      profile: profileModelReducer,
      progress: progressListReducer,
      shoes: shoesModelReducer,
      streaks: streaksModelReducer,
      summary: summaryModelReducer,
      yearlyTotals: yearlyTotalModelReducer
    })
  ],
  providers: [
    AuthenticationService,
    ChallengesService,
    ConfirmService,
    PingService,
    ProfileService,
    ProgressListService,
    requestOptionsProvider,
    ShoesService,
    StatisticsService,
    StreaksService,
    {provide: Scheduler, useClass: IntervalScheduler}
  ],
    entryComponents: [
        ConfirmComponent,
    ],
  bootstrap: [ShellComponent]
})

export class AppModule { }
