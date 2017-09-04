import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MdCardModule, MdProgressBarModule } from '@angular/material';

import { SummaryComponent } from './summary.component';
import { StatisticsService } from '../statistics/statistics.service';
import { summaryModelReducer } from '../state/summary.reducer';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

describe('ShoesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MdCardModule,
        MdProgressBarModule,
        StoreModule.provideStore({
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
        service.repeating = false;

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: {
                summary: {
                    thisWeek: '50',
                    thisMonth: '100',
                    thisYear: '1000'
                }
            } })
          ));
        });

        const fixture = TestBed.createComponent(SummaryComponent);
        fixture.componentInstance.ngOnInit();
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