import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { CompositeChartComponent } from './composite-chart.component';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { challengesModelReducer } from '../state/challenges.reducer';
import { DataSet } from '../state/data-set.model';
import { DataPoint } from '../state/data-point.model';
import * as D3 from 'd3';

import { Component } from '@angular/core';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Scheduler, NoOpScheduler } from '../service/abstract-timed-http.service';
import { By }              from '@angular/platform-browser';

@Component({
  template: '<irl-component-composite-chart [model]="model"></irl-component-composite-chart>'
})
class TestHostComponent {
  model: DataSet
}

describe('CompositeChartComponent', () => {
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
                CompositeChartComponent,
                TestHostComponent,
                ProgressCardComponent
            ],
            providers: [
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

        fixture.detectChanges();

        expect(D3.selectAll('.chart-bar').size()).toBe(0);
        expect(D3.selectAll('.dot').size()).toBe(0);

        let dataPoint1 = new DataPoint();
        dataPoint1.date = '01-01-2018';
        dataPoint1.cumulative = 100;
        dataPoint1.cumulativeFormatted = '100 mi';
        dataPoint1.monthly = 100;
        dataPoint1.monthlyFormatted = '100 mi';

        let dataPoint2 = new DataPoint();
        dataPoint2.date = '02-01-2018';
        dataPoint2.cumulative = 150;
        dataPoint2.cumulativeFormatted = '150 mi';
        dataPoint2.monthly = 50;
        dataPoint2.monthlyFormatted = '50 mi';        
        
        fixture.componentInstance.model = new DataSet();
        fixture.componentInstance.model.points = [];
        fixture.componentInstance.model.points.push(dataPoint1);
        fixture.componentInstance.model.points.push(dataPoint2);

        fixture.detectChanges();

        expect(D3.selectAll('.chart-bar').size()).toBe(2);
        expect(D3.selectAll('.dot').size()).toBe(2);
    });

});