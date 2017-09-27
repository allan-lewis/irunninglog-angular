import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MdCardModule, MdProgressBarModule } from '@angular/material';

import { StoreModule, Store } from '@ngrx/store';
import { ShoesComponent } from './shoes.component';
import { ShoesService } from './shoes.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { shoesModelReducer } from '../state/shoes.reducer';
import { AUTHENTICATE } from '../state/authentication.reducer';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { AppState } from '../state/app.state';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';

describe('ShoesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MdCardModule,
        MdProgressBarModule,
        StoreModule.provideStore({
          authentication: authenticationModelReducer,
          shoes: shoesModelReducer
        })
      ],
      declarations: [
        ShoesComponent,
        ProgressCardComponent
      ],
      providers: [
          ShoesService,
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
      ShoesService,
      Store
    ], (mockBackend, service: ShoesService, store: Store<AppState>) => {
        expect(service.getInterval()).toBe(30000);

        store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

        const fixture = TestBed.createComponent(ShoesComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a service error correctly', fakeAsync(
    inject([
      XHRBackend,
      ShoesService,
      Store
    ], (mockBackend, service: ShoesService, store: Store<AppState>) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          let error = new Error();
          error['status'] = 503;
          connection.mockError(error);
        });

        store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

        const fixture = TestBed.createComponent(ShoesComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a successful response correctly', fakeAsync(
    inject([
      XHRBackend,
      ShoesService,
      Store
    ], (mockBackend, service: ShoesService, store: Store<AppState>) => {
        let response = [
            {"id":"g2276780","name":"Omicron","brand":"Mizuno","model":"Wave Inspire 13","description":"Green","percentage":60,"progress":"OK","distance":"303.3 mi","primary":true},
            {"id":"g2276782","name":"Omicron","brand":"Mizuno","model":"Wave Inspire 13","description":null,"percentage":60,"progress":"NONE","distance":"303.3 mi","primary":true}
        ];

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: response })
          ));
        });

        store.dispatch({type: AUTHENTICATE, payload: {id: 123, token: 'token'}});

        const fixture = TestBed.createComponent(ShoesComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();
        expect(fixture.componentInstance.model).toBeTruthy();
        expect(fixture.componentInstance.model.length).toBe(2);
    })
  ));

});
