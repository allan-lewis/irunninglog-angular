import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MdCardModule, MdProgressBarModule } from '@angular/material';

import { SummaryComponent } from './summary.component';
import { StatisticsService } from '../statistics/statistics.service';
import { summaryModelReducer } from '../state/summary.reducer';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { authenticationModelReducer } from '../state/authentication.reducer';

describe('SummaryComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MdCardModule,
        MdProgressBarModule,
        StoreModule.provideStore({
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
        }
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
                years: []
            } })
          ));
        });

        store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

        const fixture = TestBed.createComponent(SummaryComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();

        store.select(state => state.summary).subscribe(x => {
            expect(x.thisWeek).toBe('50 mi');
            expect(x.thisMonth).toBe('100 mi');
            expect(x.thisYear).toBe('1,000 mi');
        });
    })
  ));

});