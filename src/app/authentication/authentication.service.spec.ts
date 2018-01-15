import 'rxjs/Rx';

import { async, fakeAsync, tick, TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AuthenticationState, AuthenticationModel } from '../state/authentication.model';

describe('AuthenticationService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot({
          authentication: authenticationModelReducer
        })
      ],
      declarations: [
      ],
      providers: [
        AuthenticationService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    }).compileComponents();
  }));

  it('should exist as an injectable service',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should contain the correct state before and after logout',
    inject([AuthenticationService], (service: AuthenticationService) => {
      let authState : AuthenticationState;
      service.authenticationModel().subscribe(x => {
        authState = x.authenticated;
      });

      localStorage.setItem('strava_code', 'bar');
      service.setState('foo');

      expect(service.getCode()).toBe('bar');
      expect(service.getState()).toBe('foo');
      expect(authState).toBe(AuthenticationState.Unknown);

      service.logout();

      expect(service.getCode()).toBeNull();
      expect(service.getState()).toBeNull();
      expect(authState).toBe(AuthenticationState.Unauthenticated);
    })
  );

  it('should login successfully',
    inject([AuthenticationService, XHRBackend], (service: AuthenticationService, mockBackend) => {
      let authModel : AuthenticationModel;
      service.authenticationModel().subscribe(x => {
        authModel = x;
      });

      let response = {id: 123, token: 'token'};

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: response })
          ));
      });

      service.login('code');

      expect(authModel.authenticated).toBe(AuthenticationState.Authenticated);
      expect(authModel.id).toBe(123);
      expect(authModel.token).toBe('token');
    })
  );

  it('should handle a failed login',
    inject([AuthenticationService, XHRBackend], (service: AuthenticationService, mockBackend) => {
      let authModel : AuthenticationModel;
      service.authenticationModel().subscribe(x => {
        authModel = x;
      });

      let response = {id: 123, token: 'token'};

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
            let error = new Error();
            error['status'] = 401;
            connection.mockError(error);
      });

      expect(authModel.authenticated).toBe(AuthenticationState.Unknown);

      service.login('code');

      expect(authModel.authenticated).toBe(AuthenticationState.Unauthenticated);
    })
  );

});
