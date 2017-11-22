import { async, fakeAsync, tick, TestBed, inject} from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { HttpModule, XHRBackend } from '@angular/http';
import {Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthenticationState } from '../state/authentication.model';

describe('AuthenticationService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.provideStore({
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

 it('should verify that the service exists', fakeAsync(
    inject([
      XHRBackend,
      AuthenticationService
    ], (mockBackend, service: AuthenticationService) => {
        expect(service).toBeTruthy();

        service.setState('state');
        expect(service.getState()).toBe('state');
    })
  ));

 it('should login successfully', fakeAsync(
    inject([
      XHRBackend,
      AuthenticationService,
      Store
    ], (mockBackend, service: AuthenticationService, store: Store<AppState>) => {

      let response = {id: 'id', token: 'token'};

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: response })
          ));
        });

        service.login('code');

        expect(service.getCode()).toBe('code');

        store.select(state => state.authentication).subscribe(x => {
            expect(x.id).toBe('id');
            expect(x.token).toBe('token');
            expect(x.authenticated).toBe(AuthenticationState.Authenticated);
        });
    })
  ));

   it('should handle a failed login', fakeAsync(
    inject([
      XHRBackend,
      AuthenticationService,
      Store
    ], (mockBackend, service: AuthenticationService, store: Store<AppState>) => {

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          let error = new Error();
          error['status'] = 401;
          connection.mockError(error);
        });

        service.login('code');

        expect(service.getCode()).toBeFalsy();
        expect(service.getState()).toBeFalsy();

        store.select(state => state.authentication).subscribe(x => {
            expect(x.id).toBeUndefined();
            expect(x.token).toBeUndefined();
            expect(x.authenticated).toBe(AuthenticationState.Unauthenticated);
        });
    })
  ));

});
