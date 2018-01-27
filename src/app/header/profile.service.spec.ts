import { async, fakeAsync, tick, TestBed, inject } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { authenticationModelReducer, AUTHENTICATE } from '../state/authentication.reducer';
import { profileModelReducer, PROFILE_SET } from '../state/profile.reducer';
import { HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AuthenticationState, AuthenticationModel } from '../state/authentication.model';
import { ProfileModel } from '../state/profile.model';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { AppState } from '../state/app.state';

describe('ProfileService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot({
          authentication: authenticationModelReducer,
          profile: profileModelReducer
        })
      ],
      declarations: [
      ],
      providers: [
        ProfileService,
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
    inject([ProfileService], (service: ProfileService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should have the correct basic behavior',
    inject([ProfileService], (service: ProfileService) => {
      expect(service.getInterval()).toBe(300000);
      expect(service.getPath()).toBe('/api/profile');
      expect(service.getErrorMessage()).toBe('failed to load profile');
      expect(service.before()).toEqual({});
    })
  );

  it('should successfully load a profile',
    inject([ProfileService, Store, XHRBackend], (service: ProfileService, store: Store<AppState>, mockBackend) => {
        let profileState: ProfileModel;
        service.profile().subscribe(x => profileState = x);

        let profile: ProfileModel = new ProfileModel();
        profile.id = 1;

        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
            connection.mockRespond(new Response(
                new ResponseOptions({ status: 200, body: profile })
            ));
        });

        store.dispatch({type: AUTHENTICATE, payload: {}});

        expect(JSON.stringify(profileState)).toEqual(JSON.stringify(profile));
    })
  );

  it('should handle a service error',
    inject([ProfileService, Store, XHRBackend], (service: ProfileService, store: Store<AppState>, mockBackend) => {
        let spy = spyOn(service, 'failure').and.callThrough();
        
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                let error = new Error();
                error['status'] = 500;
                connection.mockError(error);
        });

        store.dispatch({type: AUTHENTICATE, payload: {}});

        expect(spy).toHaveBeenCalled();
    })
  );

});
