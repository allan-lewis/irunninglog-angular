import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule, MatIconModule, MatButtonModule, MatTooltipModule, MatSnackBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { PingComponent } from './ping.component';
import { PingService } from './ping.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { challengesModelReducer } from '../state/challenges.reducer';
import { PingModel } from '../state/ping.model';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';

@Component({
  template: '<irl-component-ping [ping]="ping"></irl-component-ping>'
})
class TestHostComponent {
  ping: PingModel
}

describe('PingComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MatCardModule,
                MatIconModule,
                MatButtonModule,
                MatProgressBarModule,
                MatTooltipModule,
                MatSnackBarModule,
                StoreModule.forRoot({
                    challenges: challengesModelReducer
                })
            ],
            declarations: [
                PingComponent,
                TestHostComponent,
                ProgressCardComponent
            ],
            providers: [
                PingService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                [{ provide: Scheduler, useClass: NoOpScheduler }]
            ]
        }).compileComponents();
    }));

    it('should load and call ngOnChanges', () => {
        const fixture = TestBed.createComponent(TestHostComponent);

        fixture.componentInstance.ping = new PingModel();

        let element = fixture.debugElement.query(By.css('irl-component-ping'));
        let spy = spyOn(element.componentInstance, 'ngOnChanges').and.callThrough();

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

});