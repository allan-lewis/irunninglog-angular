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
import { YearlyTotalModel, YearlyTotalsModel } from '../state/yearly-total.model';
import { UPDATE_TOTALS } from '../state/yearly-total.reducer';
import { UPDATE_DATA_SET } from '../state/data-set.reducer';
import { RANGES_UPDATE } from '../state/statistics-date-ranges.reducer';
import { StatisticsDateRange, THIS_YEAR } from '../state/statistics-date-range.model';

const BASE = '/api/stats?';

@Injectable()
export class StatisticsService extends AbstractTimedHttpService {

    private path: string = BASE;
    private range: StatisticsDateRange;

    constructor(public store: Store<AppState>, scheduler: Scheduler, public http: Http) { 
        super(store, scheduler, http);

        this.store.select(state => state.selectedDateRange).subscribe(x => this.updatePath(x));
    }

    private updatePath(range: StatisticsDateRange) {
        const first = !this.range;

        this.range = range;

        this.path = BASE;
        this.path += 'startDate=' + (this.range.startDate ? this.range.startDate : '');
        this.path += '&endDate=' + (this.range.endDate ? this.range.endDate : '');

        // console.log("StatisticsService:updatePath", first, this.path);

        if (!first) {
            this.call();
        } else {

        }
    }

    getInterval() {
        return 30000;
    }

    getPath() {
        return this.path;
    };

    getErrorMessage() {
        return 'failed to load statistics';
    }

    before() {      
        // console.log("StatisticsService:before", this.path);
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

        let totals = new YearlyTotalsModel();

        let years = [];
        for (let entry of response.json()['years']) {
            if (entry['year'] != new Date().getFullYear()) {
                let model = new YearlyTotalModel();
                model.year = entry['year'];
                model.total = entry['total'];
                model.percentage = entry['percentage'];
                
                totals.totals.push(model);

                let range = new StatisticsDateRange();
                let year = '' + model.year;
                range.key = year;
                range.description = year;
                range.startDate = year + '-01-01';
                range.endDate = year + '-12-31';
                years.push(range);
            }
        }

        this.store.dispatch({type: UPDATE_TOTALS, payload: totals});
        this.store.dispatch({type: RANGES_UPDATE, payload: years});

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

    summary() {
        return this.store.select(state => state.summary).filter(x => !!x);
    }

    yearlyTotals() {
        return this.store.select(state => state.yearlyTotals).filter(x => !!x);
    }

    dataSet() {
        return this.store.select(state => state.dataSet).filter(x => !!x);
    }

    dateRanges() {
        return this.store.select(state => state.statisticsDateRanges).filter(x => !!x);
    }

    selectedDateRange() {
        return this.store.select(state => state.selectedDateRange).filter(x => !!x);
    }

}