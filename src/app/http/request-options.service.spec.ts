import 'rxjs/Rx';

import { async, fakeAsync, tick, TestBed, inject } from '@angular/core/testing';
import { AppRequestOptions } from './request-options.service';
import { authenticationModelReducer, AUTHENTICATE } from '../state/authentication.reducer';
import { HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AuthenticationState, AuthenticationModel } from '../state/authentication.model';
import { AppState } from '../state/app.state';

describe('AppRequestOptions', () => {
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
        AppRequestOptions,
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    }).compileComponents();
  }));

  it('should exist as an injectable service',
    inject([AppRequestOptions], (service: AppRequestOptions) => {
        expect(service).toBeTruthy();
    })
  );

  it('should have the expected header values',
    inject([AppRequestOptions, Store], (service: AppRequestOptions, store: Store<AppState>) => {
        store.dispatch({type: AUTHENTICATE, payload: {token: 'token'}});

        expect(service.headers.get('Content-Type')).toBe('application/json');
        expect(service.headers.get('IRL-TimeZone-Offset')).toBe(new Date().getTimezoneOffset().toString());
        expect(service.headers.get('Authorization')).toBe('Bearer token');
    })
  );

});
