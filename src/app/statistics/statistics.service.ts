import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { AbstractTimedHttpService, Scheduler } from '../service/abstract-timed-http.service';
import { SummaryModel } from '../state/summary.model';
import { SUMMARY_UPDATE } from '../state/summary.reducer';
import { DataPoint } from '../state/data-point.model';
import { YearlyTotalModel } from '../state/yearly-total.model';
import { UPDATE_TOTALS } from '../state/yearly-total.reducer';
import { UPDATE_DATA_POINTS } from '../state/data-point.reducer';
import { UPDATE_DATA_TOTALS } from '../state/data-point.reducer';

@Injectable()
export class StatisticsService extends AbstractTimedHttpService {

    constructor(public store: Store<AppState>, scheduler: Scheduler, public http: Http) { 
        super(store, scheduler, http);
    }

    getInterval() {
        return 30000;
    }

    getPath() {
         return '/api/stats'
    };

    getErrorMessage() {
        return 'failed to load statistics';
    }

    before() {
        // Nothing to do here
    }

    failure(response: Response, before: any) { 
        // Nothing to do here
    }

    success(response: Response, before: any) {
        let json = response.json();

        let model = new SummaryModel();
        let summary = json['summary'];
        model.thisWeek = summary['thisWeek'];
        model.thisMonth = summary['thisMonth'];
        model.thisYear = summary['thisYear'];
        model.allTime = summary['allTime'];

        this.store.dispatch({type: SUMMARY_UPDATE, payload: model});

        for (let entry of response.json()['years']) {
            let model = new YearlyTotalModel();
            model.year = entry['year'];
            model.total = entry['total'];
            model.percentage = entry['percentage'];

            this.store.dispatch({type: UPDATE_TOTALS, payload: model});
        }

        let index = 0;
        let points: Array<DataPoint> = [];
        for (let entry of json['dataSets']['points']['points']) {
            let dataPoint = new DataPoint();
            dataPoint.label = entry['label'];
            dataPoint.value = Number(entry['value']);
            dataPoint.index = index++;
            points.push(dataPoint);
        }

        index = 0;
        let totals: Array<DataPoint> = [];
        for (let entry of json['dataSets']['totals']['points']) {
            let dataPoint = new DataPoint();
            dataPoint.label = entry['label'];
            dataPoint.value = Number(entry['value']);
            dataPoint.index = index++;
            totals.push(dataPoint);
        }

        this.store.dispatch({type: UPDATE_DATA_POINTS, payload: points});
        this.store.dispatch({type: UPDATE_DATA_TOTALS, payload: totals});
    }

}