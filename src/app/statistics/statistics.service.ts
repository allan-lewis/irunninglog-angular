import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { AbstractTimedHttpService } from '../service/abstract-timed-http.service';
import { SummaryModel } from '../state/summary.model';
import { SUMMARY_UPDATE } from '../state/summary.reducer';

@Injectable()
export class StatisticsService extends AbstractTimedHttpService {

    constructor(public store: Store<AppState>, public http: Http) { 
        super(http);
    }

    getInterval() {
        return 15000;
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
    }

}