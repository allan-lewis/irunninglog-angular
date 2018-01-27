import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatIconModule, MatDialogModule, MatToolbarModule, MatTooltipModule, MatSnackBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { HeaderComponent } from './header.component';
import { LogoutComponent } from './logout.component';
import { PingComponent } from '../ping/ping.component';
import { PingService } from '../ping/ping.service';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';

import { AuthenticationService } from '../authentication/authentication.service';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { profileModelReducer } from '../state/profile.reducer';
import { pingModelReducer } from '../state/ping.reducer';
import { AuthenticationModel, AuthenticationState } from '../state/authentication.model';
import { ConfirmService } from '../confirm/confirm.service';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';

describe('HeaderComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MatIconModule,
                MatDialogModule,
                MatToolbarModule,
                MatTooltipModule,
                MatSnackBarModule,
                StoreModule.forRoot({
                    authentication: authenticationModelReducer,
                    profile: profileModelReducer,
                    ping: pingModelReducer
                })
            ],
            declarations: [
                HeaderComponent,
                LogoutComponent,
                PingComponent,
                ProfileComponent
            ],
            providers: [
                AuthenticationService,
                ConfirmService,
                PingService,
                ProfileService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                [{ provide: Scheduler, useClass: NoOpScheduler }]
            ]
        }).compileComponents();
    }));

    it('should load the component', () => {
        const fixture = TestBed.createComponent(HeaderComponent);

        let auth = new AuthenticationModel();
        auth.authenticated = AuthenticationState.Authenticated;
        fixture.componentInstance.authenticationModel = auth;

        fixture.detectChanges();

        expect(fixture.componentInstance.ping).toBeDefined();
        expect(fixture.componentInstance.profile).toBeDefined();
    });

});