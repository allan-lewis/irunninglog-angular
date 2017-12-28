import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';

import { SummaryComponent } from './summary.component';
import { StatisticsService } from '../statistics/statistics.service';
import { summaryModelReducer } from '../state/summary.reducer';
import { SummaryModel } from '../state/summary.model';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';

describe('SummaryComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MatCardModule,
        MatProgressBarModule,
        StoreModule.forRoot({
          authentication: authenticationModelReducer,
          summary: summaryModelReducer
        })
      ],
      declarations: [
        SummaryComponent
      ],
      providers: [
          StatisticsService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        [{provide: Scheduler, useClass: NoOpScheduler}]
      ]
    }).compileComponents();
  }));

 it('should load the component', fakeAsync(
    inject([
      XHRBackend,
      StatisticsService,
      Store
    ], (mockBackend, service: StatisticsService, store: Store<AppState>) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: {
                summary: {
                    thisWeek: '50 mi',
                    thisMonth: '100 mi',
                    thisYear: '1,000 mi'
                },
                years: [],
                dataSet: {
                  points: []
                }
            } })
          ));
        });

        const fixture = TestBed.createComponent(SummaryComponent);
        fixture.componentInstance.model = new SummaryModel();
        expect(fixture.componentInstance).not.toBeNull();
        expect(fixture.componentInstance.model).toBeTruthy();
    })
  ));

});