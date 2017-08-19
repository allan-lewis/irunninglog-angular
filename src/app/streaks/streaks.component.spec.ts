import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MdCardModule, MdProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { StreaksComponent } from './streaks.component';
import { StreaksService } from './streaks.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { streaksModelReducer } from '../state/streaks.reducer';

import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('StreaksComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MdCardModule,
        MdProgressBarModule,
        StoreModule.provideStore({
            streaks: streaksModelReducer
        })
      ],
      declarations: [
        StreaksComponent,
        ProgressCardComponent
      ],
      providers: [
          StreaksService,
        {
          provide: XHRBackend,
          useClass: MockBackend
        }
      ]
    }).compileComponents();
  }));

 it('should load the component', fakeAsync(
    inject([
      XHRBackend,
      StreaksService
    ], (mockBackend, service: StreaksService) => {
        service.repeating = false;

        expect(service.getInterval()).toBe(30000);

        const fixture = TestBed.createComponent(StreaksComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a service error correctly', fakeAsync(
    inject([
      XHRBackend,
      StreaksService
    ], (mockBackend, service: StreaksService) => {
        service.repeating = false;

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          let error = new Error();
          error['status'] = 503;
          connection.mockError(error);
        });

        const fixture = TestBed.createComponent(StreaksComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a successful response with no streaks correctly', fakeAsync(
    inject([
      XHRBackend,
      StreaksService
    ], (mockBackend, service: StreaksService) => {
        service.repeating = false;

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: {} })
          ));
        });

        const fixture = TestBed.createComponent(StreaksComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
        expect(fixture.componentInstance.model).toBeTruthy();
        expect(fixture.componentInstance.model.current).toBeFalsy();
        expect(fixture.componentInstance.model.longest).toBeFalsy();
        expect(fixture.componentInstance.model.thisYear).toBeFalsy();
    })
  ));

 it('should handle a successful response with streaks correctly', fakeAsync(
    inject([
      XHRBackend,
      StreaksService
    ], (mockBackend, service: StreaksService) => {
        service.repeating = false;

        let response = {"longest":{"@class":"com.irunninglog.spring.streaks.Streak","startDate":"2015-01-01","endDate":"2015-10-01","progress":"GOOD","days":274,"runs":274,"percentage":100},"current":{"@class":"com.irunninglog.spring.streaks.Streak","startDate":"2016-12-04","endDate":"2017-08-19","progress":"GOOD","days":259,"runs":262,"percentage":94},"thisYear":{"@class":"com.irunninglog.spring.streaks.Streak","startDate":"2016-12-04","endDate":"2017-08-19","progress":"GOOD","days":259,"runs":262,"percentage":94}};

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: response })
          ));
        });

        const fixture = TestBed.createComponent(StreaksComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
        expect(fixture.componentInstance.model).toBeTruthy();
        expect(fixture.componentInstance.model.current).toBeTruthy();
        expect(fixture.componentInstance.model.longest).toBeTruthy();
        expect(fixture.componentInstance.model.thisYear).toBeTruthy();
    })
  ));

});
