import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { ChallengesComponent } from './challenges.component';
import { ChallengesService } from './challenges.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { challengesModelReducer } from '../state/challenges.reducer';
import { ChallengesModel } from '../state/challenges.model';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';

describe('ChallengesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MatCardModule,
        MatProgressBarModule,
        StoreModule.forRoot({
          challenges: challengesModelReducer
        })
      ],
      declarations: [
        ChallengesComponent,
        ProgressCardComponent
      ],
      providers: [
          ChallengesService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        [{provide: Scheduler, useClass: NoOpScheduler}]
      ]
    }).compileComponents();
  }));

 it('should load the component', fakeAsync(
    inject([
      XHRBackend,
      ChallengesService
    ], (mockBackend, service: ChallengesService) => {
        expect(service.getInterval()).toBe(30000);

        const fixture = TestBed.createComponent(ChallengesComponent);
        fixture.componentInstance.model = new ChallengesModel();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a service error correctly', fakeAsync(
    inject([
      XHRBackend,
      ChallengesService
    ], (mockBackend, service: ChallengesService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          let error = new Error();
          error['status'] = 503;
          connection.mockError(error);
        });

        const fixture = TestBed.createComponent(ChallengesComponent);
        fixture.componentInstance.model = new ChallengesModel();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a successful response correctly', fakeAsync(
    inject([
      XHRBackend,
      ChallengesService
    ], (mockBackend, service: ChallengesService) => {
        let response = [{"name":"From the Earth to the Moon","description":"Average distance","distanceTotal":"238,855 mi","distanceDone":"7,379.7 mi","percentage":3,"progress":"BAD"}];

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: response })
          ));
        });

        const fixture = TestBed.createComponent(ChallengesComponent);
        fixture.componentInstance.model = new ChallengesModel();
        expect(fixture.componentInstance).not.toBeNull();
        expect(fixture.componentInstance.model).toBeTruthy();
    })
  ));

});
