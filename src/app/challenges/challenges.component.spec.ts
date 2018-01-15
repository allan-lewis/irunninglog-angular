import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { ChallengesComponent } from './challenges.component';
import { ChallengesService } from './challenges.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { challengesModelReducer } from '../state/challenges.reducer';
import { ChallengesModel } from '../state/challenges.model';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';

@Component({
  template: '<irl-component-challenges [model]="model"></irl-component-challenges>'
})
class TestHostComponent {
  model: ChallengesModel
}

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
                TestHostComponent,
                ProgressCardComponent
            ],
            providers: [
                ChallengesService,
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

        fixture.componentInstance.model = new ChallengesModel();

        let heroEl = fixture.debugElement.query(By.css('irl-component-challenges'));
        let spy = spyOn(heroEl.componentInstance, 'ngOnChanges').and.callThrough();

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

});