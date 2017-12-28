import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';

import { StoreModule, Store } from '@ngrx/store';
import { ShoesComponent } from './shoes.component';
import { ShoesService } from './shoes.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { shoesModelReducer } from '../state/shoes.reducer';
import { ShoesModel } from '../state/shoes.model';
import { ShoeModel } from '../state/shoe.model';
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
        MatCardModule,
        MatProgressBarModule,
        StoreModule.forRoot({
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
      ShoesService
    ], (mockBackend, service: ShoesService) => {
        expect(service.getInterval()).toBe(30000);

        const fixture = TestBed.createComponent(ShoesComponent);
        fixture.componentInstance.shoes = new ShoesModel();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a service error correctly', fakeAsync(
    inject([
      XHRBackend,
      ShoesService
    ], (mockBackend, service: ShoesService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          let error = new Error();
          error['status'] = 503;
          connection.mockError(error);
        });

        const fixture = TestBed.createComponent(ShoesComponent);
        fixture.componentInstance.shoes = new ShoesModel();
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

 it('should handle a successful response correctly', fakeAsync(
    inject([
      XHRBackend,
      ShoesService,
      Store
    ], (mockBackend) => {
        const fixture = TestBed.createComponent(ShoesComponent);

        let shoes = new ShoesModel();
        shoes.shoes.push(new ShoeModel());
        shoes.shoes.push(new ShoeModel());
        fixture.componentInstance.shoes = shoes;

        expect(fixture.componentInstance).not.toBeNull();
        expect(fixture.componentInstance.shoes).toBeTruthy();
        expect(fixture.componentInstance.shoes.shoes).toBeTruthy();
        expect(fixture.componentInstance.shoes.shoes.length).toBe(2);
    })
  ));

});
