import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MdCardModule, MdProgressBarModule } from '@angular/material';

import { YearlyComponent } from './yearly.component';
import { YearlyTotalComponent } from './yearly-total.component';
import { StatisticsService } from '../statistics/statistics.service';
import { yearlyTotalModelReducer } from '../state/yearly-total.reducer';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { authenticationModelReducer } from '../state/authentication.reducer';

import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

describe('YearlyTotalComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MdCardModule,
        MdProgressBarModule,
        StoreModule.provideStore({
          authentication: authenticationModelReducer,
          yearlyTotals: yearlyTotalModelReducer
        })
      ],
      declarations: [
        YearlyComponent,
        YearlyTotalComponent
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
                    thisWeek: '50',
                    thisMonth: '100',
                    thisYear: '1000'
                },
                years: [{year: 2017, total: '1,500 mi'}]
            } })
          ));
        });

        store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

        const fixture = TestBed.createComponent(YearlyComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();

        store.select(state => state.yearlyTotals).subscribe(x => {
          expect(x.length).toBe(1);
        });
    })
  ));

});