import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { StoreModule, Store } from '@ngrx/store';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { AuthenticationModel, AuthenticationState } from '../state/authentication.model';
import { profileModelReducer } from '../state/profile.reducer';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { AppState } from '../state/app.state';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';

let authenticationModel = new AuthenticationModel(); 

describe('ProfileComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [        
        HttpModule,
        StoreModule.provideStore({
          authentication: authenticationModelReducer,
          profile: profileModelReducer
        })
      ],
      declarations: [
        ProfileComponent
      ],
      providers: [
          ProfileService,        
          {
          provide: XHRBackend,
          useClass: MockBackend
        },
        [{provide: Scheduler, useClass: NoOpScheduler}]
      ]
    }).compileComponents();
  }));

 it('should handle a successful response correctly', fakeAsync(
    inject([
      XHRBackend,
      ProfileService,
      Store
    ], (mockBackend, service: ProfileService, store: Store<AppState>) => {
        expect(service.getInterval()).toBe(300000);

        let response = {};

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: response })
          ));
        });

        store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});
        
        const fixture = TestBed.createComponent(ProfileComponent);
        fixture.detectChanges();

        expect(fixture.componentInstance).not.toBeNull();
        expect(fixture.componentInstance.profile).toBeTruthy();
    })
  ));

  it('should handle a service error correctly', fakeAsync(
    inject([
      XHRBackend,
      ProfileService,
      Store
    ], (mockBackend, service: ProfileService, store: Store<AppState>) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          let error = new Error();
          error['status'] = 503;
          connection.mockError(error);
        });

        store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

        const fixture = TestBed.createComponent(ProfileComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));
  
});