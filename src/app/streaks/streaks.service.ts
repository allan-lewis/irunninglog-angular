import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AbstractTimedHttpService } from '../service/abstract-timed-http.service';
import { STREAKS_UPDATE } from '../state/streaks.reducer';
import { StreakModel, StreaksModel } from '../state/streaks.model';
import * as moment from 'moment';

@Injectable()
export class StreaksService extends AbstractTimedHttpService {

    constructor(public store: Store<AppState>, http: Http) { 
        super(http);
    }

    getInterval() {
        return 30000;
    }

    getPath() {
         return '/api/streaks'
    };

    getErrorMessage() {
        return 'failed to load streaks';
    }

    before() {
        return {};
    }

    failure(response: Response, before: any) { }

    success(result: any, before: any) {
        let streaks = new StreaksModel();
        streaks.longest = this.streakFromJson('Longest Streak Ever', result['longest']);
        streaks.current = this.streakFromJson('Current Streak', result['current']);
        streaks.thisYear = this.streakFromJson('Longest Streak This Year', result['thisYear']);
        this.store.dispatch({type: STREAKS_UPDATE, payload: streaks})
    }

    private streakFromJson(title: string, json: any) {
        if (!json) {
            return null;
        }

        let streak = new StreakModel();

        streak.title = title;
        streak.subtitle = moment(json['startDate'], 'YYYY-MM-DD').format('MMM D, YYYY') + ' through ' + moment(json['endDate'], 'YYYY-MM-DD').format('MMM D, YYYY');
        streak.lineOne = json['days'] + ' days';
        streak.lineTwo = json['runs'] + ' runs';
        streak.progress = json['progress'];
        streak.percentage = json['percentage'];

        return streak;
    }

}
