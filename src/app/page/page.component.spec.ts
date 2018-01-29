import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { ChallengesService } from '../challenges/challenges.service';
import { StatisticsService } from '../statistics/statistics.service';
import { ShoesService } from '../shoes/shoes.service';
import { StreaksService } from '../streaks/streaks.service';
import { ProgressListService } from '../progress/progress-list.service';
import { PageComponent } from './page.component';
import { ProgressListComponent } from '../progress/progress-list.component';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { SummaryComponent } from '../summary/summary.component';
import { YearlyComponent } from '../yearly/yearly.component';
import { YearlyTotalComponent } from '../yearly/yearly-total.component';
import { CompositeChartComponent } from '../chart/composite-chart.component';
import { AuthenticationService } from '../authentication/authentication.service';

import { authenticationModelReducer } from '../state/authentication.reducer';
import { challengesModelReducer } from '../state/challenges.reducer';
import { ChallengesModel } from '../state/challenges.model';
import { shoesModelReducer } from '../state/shoes.reducer';
import { ShoesModel } from '../state/shoes.model';
import { streaksModelReducer } from '../state/streaks.reducer';
import { StreaksModel } from '../state/streaks.model';
import { dataSetModelReducer } from '../state/data-set.reducer';
import { DataSet } from '../state/data-set.model';
import { progressListReducer } from '../state/progress-list.reducer';
import { summaryModelReducer } from '../state/summary.reducer';
import { yearlyTotalModelReducer } from '../state/yearly-total.reducer';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

describe('PageComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MatCardModule,
                MatProgressBarModule,
                StoreModule.forRoot({
                    authentication: authenticationModelReducer,
                    challenges: challengesModelReducer,
                    shoes: shoesModelReducer,
                    streaks: streaksModelReducer,
                    dataSet: dataSetModelReducer,
                    progress: progressListReducer,
                    summary: summaryModelReducer,
                    yearlyTotals: yearlyTotalModelReducer
                })
            ],
            declarations: [
                PageComponent,
                ProgressListComponent,
                ProgressCardComponent,
                CompositeChartComponent,
                SummaryComponent,
                YearlyComponent,
                YearlyTotalComponent
            ],
            providers: [
                AuthenticationService,
                ChallengesService,
                StatisticsService,
                ShoesService,
                StreaksService,
                ProgressListService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                [{ provide: Scheduler, useClass: NoOpScheduler }]
            ]
        }).compileComponents();
    }));

    it('should load the component', () => {
        const fixture = TestBed.createComponent(PageComponent);

        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should have the expected initial state',
        inject([Store], (store: Store<AppState>) => {
            const fixture = TestBed.createComponent(PageComponent);

            expect(fixture.componentInstance.challenges).toBeTruthy();
            expect(fixture.componentInstance.dataSet).toBeTruthy();
            expect(fixture.componentInstance.shoes).toBeTruthy();
            expect(fixture.componentInstance.streaks).toBeTruthy();
            expect(fixture.componentInstance.yearlyTotals).toBeTruthy();
            expect(fixture.componentInstance.summary).toBeTruthy();
            expect(fixture.componentInstance.progressList).toBeTruthy();
        })
    );

});