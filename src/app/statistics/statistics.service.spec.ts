import { async, fakeAsync, tick, TestBed, inject} from '@angular/core/testing';
import { StatisticsService } from './statistics.service';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { summaryModelReducer } from '../state/summary.reducer';
import { HttpModule, Http, XHRBackend } from '@angular/http';
import { Response, ResponseOptions, RequestMethod} from '@angular/http';
import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('PingService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        StoreModule.provideStore({
          auth: authenticationModelReducer,
          summary: summaryModelReducer
        })
      ],
      declarations: [
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

 it('should verify basic service methods', fakeAsync(
    inject([
      XHRBackend,
      StatisticsService
    ], (mockBackend, service: StatisticsService) => {
        service.repeating = false;
        
        expect(service.getInterval()).toBe(15000);
        expect(service.getPath()).toBe('/api/stats');
        expect(service.getErrorMessage()).toBe('failed to load statistics');
    })
  ));

  it('should handle a service error correctly', fakeAsync(
    inject([
      XHRBackend,
      StatisticsService,
      Store
    ], (mockBackend, service: StatisticsService, store: Store<AppState>) => {
        service.repeating = false;

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          let error = new Error();
          error['status'] = 401;
          connection.mockError(error);
        });

        service.load();

        store.select(state => state.summary).subscribe(x => {
            expect(x.thisWeek).toBe('--');
            expect(x.thisMonth).toBe('--');
            expect(x.thisYear).toBe('--');
        });
    })
  ));

  it('should handle a successful service call', fakeAsync(
    inject([
      XHRBackend,
      StatisticsService,
      Store
    ], (mockBackend, service: StatisticsService, store: Store<AppState>) => {
        service.repeating = false;


      let response = {
          summary: {
              thisWeek: '63 mi',
              thisMonth: '38.5 mi',
              thisYear: '1,441 mi'
          },
          years: []
      };

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: response })
          ));
        });

        service.load();

        store.select(state => state.summary).subscribe(x => {
            expect(x.thisWeek).toBe('63 mi');
            expect(x.thisMonth).toBe('38.5 mi');
            expect(x.thisYear).toBe('1,441 mi');
        });
    })
  ));

});