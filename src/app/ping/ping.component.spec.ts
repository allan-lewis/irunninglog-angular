import { TestBed, inject } from '@angular/core/testing';

import { CommaSeparatedNumberPipe } from '../pipe/comma.pipe';
import { PingComponent, PingGoodComponent, PingBadComponent } from './ping.component';
import { PingService } from './ping.service';
import { AuthenticationModel } from '../state/authentication.model';
import { pingModelReducer } from '../state/ping.reducer';
import { HttpModule, Http, XHRBackend } from '@angular/http';
import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { By }              from '@angular/platform-browser';

import { StoreModule, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { authenticationModelReducer } from '../state/authentication.reducer';

let authenticationModel = new AuthenticationModel(); 

const mockResponse = {};

describe('PingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        StoreModule.provideStore({
          authentication: authenticationModelReducer,
          ping: pingModelReducer
        })
      ],
      declarations: [
        PingComponent,
        PingGoodComponent,
        PingBadComponent,
        CommaSeparatedNumberPipe,
      ],
      providers: [
          PingService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    }).compileComponents();
  }));

 it('should ping successfully', fakeAsync(
    inject([
      XHRBackend,
      PingService,
      Store
    ], (mockBackend, service: PingService, store: Store<AppState>) => {


        expect(true).toBeTruthy();

      const expectedUrl = '/api/ping';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: mockResponse })
          ));
        });

      store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

    const fixture = TestBed.createComponent(PingComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.ping.status).toBe(200);
    tick(1000);
    })
  ));

 it('should ping with a 503 error', fakeAsync(
    inject([
      XHRBackend,
      PingService,
      Store
    ], (mockBackend, service: PingService, store: Store<AppState>) => {


        expect(true).toBeTruthy();

      const expectedUrl = '/api/ping';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          let error = new Error();
          error['status'] = 503;
          connection.mockError(error);
        });

      store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

    const fixture = TestBed.createComponent(PingComponent);
    // fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    // const ping = fixture.componentInstance.ping;
    expect(fixture.componentInstance.ping.status).toBe(503);
    tick(1000);
    })
  ));

  it('should verify styles', fakeAsync(() => {
    const fixture = TestBed.createComponent(PingComponent);

    expect(fixture.componentInstance.style()).toBe('none');

    fixture.componentInstance.ping.status = 501;

    expect(fixture.componentInstance.style()).toBe('bad');

    fixture.componentInstance.ping.status = 200;
    fixture.componentInstance.ping.average = 20;

    expect(fixture.componentInstance.style()).toBe('good');

    fixture.componentInstance.ping.status = 200;
    fixture.componentInstance.ping.average = 700;

    expect(fixture.componentInstance.style()).toBe('ok');

    fixture.componentInstance.ping.status = 200;
    fixture.componentInstance.ping.average = 1001;

    expect(fixture.componentInstance.style()).toBe('bad');
  }));

});