import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login.component';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { authenticationModelReducer } from '../state/authentication.reducer';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';

describe('LoginComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MatCardModule,
                MatProgressBarModule,
                StoreModule.forRoot({
                    authentication: authenticationModelReducer
                })
            ],
            declarations: [
                LoginComponent,
                ProgressCardComponent
            ],
            providers: [
                AuthenticationService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                [{ provide: Scheduler, useClass: NoOpScheduler }]
            ]
        }).compileComponents();
    }));

    it('should load the component', () => {
        const fixture = TestBed.createComponent(LoginComponent);

        expect(fixture.componentInstance).toBeTruthy();
    });

  it('should login successfully',
    inject([AuthenticationService], (service: AuthenticationService) => {
        const fixture = TestBed.createComponent(LoginComponent);

        expect(service.getState()).toBeFalsy();

        fixture.componentInstance.login();

        expect(service.getState()).toBeTruthy();
    })
  );

});