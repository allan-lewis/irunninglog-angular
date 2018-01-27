import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { profileModelReducer } from '../state/profile.reducer';
import { ProfileModel } from '../state/profile.model';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';

@Component({
  template: '<irl-component-profile [profile]="profile"></irl-component-profile>'
})
class TestHostComponent {
  profile: ProfileModel
}

describe('ProfileComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                MatCardModule,
                MatProgressBarModule,
                StoreModule.forRoot({
                    profile: profileModelReducer
                })
            ],
            declarations: [
                ProfileComponent,
                TestHostComponent,
                ProgressCardComponent
            ],
            providers: [
                ProfileService,
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

        fixture.componentInstance.profile = new ProfileModel();

        let element = fixture.debugElement.query(By.css('irl-component-profile'));
        let spy = spyOn(element.componentInstance, 'ngOnChanges').and.callThrough();

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

});