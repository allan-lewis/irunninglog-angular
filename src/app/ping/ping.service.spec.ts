import { async, fakeAsync, tick, TestBed, inject } from '@angular/core/testing';
import { PingService } from './ping.service';
import { authenticationModelReducer, AUTHENTICATE } from '../state/authentication.reducer';
import { challengesModelReducer, UPDATE_CHALLENGE } from '../state/challenges.reducer';
import { pingModelReducer } from '../state/ping.reducer';
import { HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AuthenticationState, AuthenticationModel } from '../state/authentication.model';
import { PingModel } from '../state/ping.model';
import { ChallengeModel } from '../state/challenge.model';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { AppState } from '../state/app.state';

describe('ChallengesService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot({
            authentication: authenticationModelReducer,
            ping: pingModelReducer
        })
      ],
      declarations: [
      ],
      providers: [
        PingService,
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

  it('should exist as an injectable service',
    inject([PingService], (service: PingService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should have the correct basic behavior',
    inject([PingService], (service: PingService) => {
      expect(service.getInterval()).toBe(15000);
      expect(service.getPath()).toBe('/api/ping');
      expect(service.getErrorMessage()).toBe('failed to ping');
      expect(service.before().timestamp).toBeGreaterThan(0);
    })
  );

  it('should successfully load challenges',
    inject([PingService, Store, XHRBackend], (service: PingService, store: Store<AppState>, mockBackend) => {
        let ping: PingModel;
        service.ping().subscribe(x => ping = x);

        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
            connection.mockRespond(new Response(
                new ResponseOptions({ status: 200, body: {'timestamp':'2018-01-30T01:47:58.768'} })
            ));
        });

        store.dispatch({type: AUTHENTICATE, payload: {}});

        expect(ping.status).toBe(200);
    })
  );

  it('should handle a service error',
    inject([PingService, Store, XHRBackend], (service: PingService, store: Store<AppState>, mockBackend) => {
        let ping: PingModel;
        service.ping().subscribe(x => ping = x);
        
        let spy = spyOn(service, 'failure').and.callThrough();
        
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                let error = new Error();
                error['status'] = 503;
                connection.mockError(error);
        });

        store.dispatch({type: AUTHENTICATE, payload: {}});

        expect(spy).toHaveBeenCalled();

        expect(ping.status).toBe(503);
        expect(ping.average).toBe(0);
        expect(ping.last).toBe(0);
        expect(ping.min).toBe(0);
        expect(ping.max).toBe(0);
    })
  );

});
