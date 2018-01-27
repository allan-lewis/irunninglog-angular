import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatIconModule, MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { LogoutComponent } from './logout.component';

import { AuthenticationService } from '../authentication/authentication.service';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { ConfirmService } from '../confirm/confirm.service';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';

describe('LogoutComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MatIconModule,
                MatDialogModule,
                StoreModule.forRoot({
                    authentication: authenticationModelReducer
                })
            ],
            declarations: [
                LogoutComponent
            ],
            providers: [
                AuthenticationService,
                ConfirmService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                [{ provide: Scheduler, useClass: NoOpScheduler }]
            ]
        }).compileComponents();
    }));

    it('should load the component', () => {
        const fixture = TestBed.createComponent(LogoutComponent);

        fixture.detectChanges();

        expect(fixture.nativeElement).toBeTruthy();
    });

});