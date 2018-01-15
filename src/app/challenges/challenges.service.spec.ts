import { async, fakeAsync, tick, TestBed, inject } from '@angular/core/testing';
import { ChallengesService } from './challenges.service';
import { authenticationModelReducer, AUTHENTICATE } from '../state/authentication.reducer';
import { challengesModelReducer, UPDATE_CHALLENGE } from '../state/challenges.reducer';
import { HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { AuthenticationState, AuthenticationModel } from '../state/authentication.model';
import { ChallengesModel } from '../state/challenges.model';
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
          challenges: challengesModelReducer
        })
      ],
      declarations: [
      ],
      providers: [
        ChallengesService,
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
    inject([ChallengesService], (service: ChallengesService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should have the correct basic behavior',
    inject([ChallengesService], (service: ChallengesService) => {
      expect(service.getInterval()).toBe(30000);
      expect(service.getPath()).toBe('/api/challenges');
      expect(service.getErrorMessage()).toBe('failed to load challenges');
      expect(service.before()).toEqual({});
    })
  );

  it('should expose the expected state',
    inject([ChallengesService, Store], (service: ChallengesService, store: Store<AppState>) => {
        let challenges: ChallengesModel;
        service.challenges().subscribe(x => challenges = x);

        expect(challenges).toEqual({challenges:[]});

        let challenge = new ChallengeModel();
        let newChallenges = new ChallengesModel();
        newChallenges.challenges.push(challenge);

        store.dispatch({type: UPDATE_CHALLENGE, payload: newChallenges});

        expect(JSON.stringify(challenges)).toEqual(JSON.stringify(newChallenges));
    })
  );

  it('should successfully load challenges',
    inject([ChallengesService, Store, XHRBackend], (service: ChallengesService, store: Store<AppState>, mockBackend) => {
        let challenges: ChallengesModel;
        service.challenges().subscribe(x => challenges = x);

        let challenge = new ChallengeModel();
        challenge.distanceInt = 50;
        let challengesModel = new ChallengesModel();
        challengesModel.challenges.push(challenge);

        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
            connection.mockRespond(new Response(
                new ResponseOptions({ status: 200, body: [challenge] })
            ));
        });

        store.dispatch({type: AUTHENTICATE, payload: {}});

        expect(JSON.stringify(challenges)).toEqual(JSON.stringify(challengesModel));
    })
  );

  it('should handle a service error',
    inject([ChallengesService, Store, XHRBackend], (service: ChallengesService, store: Store<AppState>, mockBackend) => {
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
