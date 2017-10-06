import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MdCardModule, MdProgressBarModule } from '@angular/material';
import { Component } from '@angular/core';
import { ChartComponent } from './chart.component';
import { StatisticsService } from '../statistics/statistics.service';
import { yearlyTotalModelReducer } from '../state/yearly-total.reducer';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';

import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'test-component-wrapper',
  template: '<irl-component-chart *ngIf="chartData" [data]="chartData"></irl-component-chart>'
})
class TestComponentWrapper {
  chartData = [];
}

describe('ChartComponent', () => {
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
        TestComponentWrapper,
        ChartComponent
      ],
      providers: [
          StatisticsService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        {
            provide: Scheduler, 
            useClass: NoOpScheduler
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
        console.log('YO!!!!!!!!!');
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                console.log('CONNECTION');
            connection.mockRespond(new Response(
                new ResponseOptions({ status: 200, body: {} })
            ));
            });

    //     store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

        const fixture = TestBed.createComponent(TestComponentWrapper);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();

        // store.select(state => state.yearlyTotals).subscribe(x => {
        //   expect(x.length).toBe(1);
        // });
    })
  ));

});