import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { AbstractTimedHttpService, Scheduler } from '../service/abstract-timed-http.service';
import { SummaryModel } from '../state/summary.model';
import { SUMMARY_UPDATE } from '../state/summary.reducer';
import { DataPoint } from '../state/data-point.model';
import { DataSet } from '../state/data-set.model';
import { YearlyTotalModel } from '../state/yearly-total.model';
import { UPDATE_TOTALS } from '../state/yearly-total.reducer';
import { UPDATE_DATA_SET } from '../state/data-set.reducer';

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

        let dataPoints: Array<DataPoint> = [];
        for (let entry of response.json()['dataSet']['points']) {
            let point = new DataPoint();
            point.date = entry.date;
            point.monthly = Number(entry.values.monthly);
            point.monthlyFormatted = entry.values.monthlyFormatted;
            point.cumulative = Number(entry.values.cumulative);
            point.cumulativeFormatted = entry.values.cumulativeFormatted;

            dataPoints.push(point);
        }

        let dataSet = new DataSet();
        dataSet.points = dataPoints;

        this.store.dispatch({type: UPDATE_DATA_SET, payload: dataSet});
    }

}