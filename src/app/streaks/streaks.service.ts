import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { STREAKS_UPDATE } from '../state/streaks.reducer';
import { StreakModel, StreaksModel } from '../state/streaks.model';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class StreaksService {

    constructor(public store: Store<AppState>, public http: Http) { }

    STREAKS = {
        longest: {
            startDate: '2015-01-01',
            endDate: '2015-10-01',
            progress: 'GOOD',
            days: 274,
            runs: 274,
            percentage: 100
        },
        current: {
            startDate: '2017-06-10',
            endDate: '2017-06-12',
            progress: 'BAD',
            days: 3,
            runs: 3,
            percentage: 1
        },
        thisYear: {
            startDate: '2016-12-04',
            endDate: '2017-06-02',
            progress: 'OK',
            days: 181,
            runs: 184,
            percentage: 68
        }
    };

    load() {
        this.update(this.STREAKS);
    }

    update(json: any) {
        let streaks = new StreaksModel();
        streaks.longest = this.streakFromJson('Longest Streak Ever', json['longest']);
        streaks.current = this.streakFromJson('Current Streak', json['current']);
        streaks.thisYear = this.streakFromJson('Longest Streak This Year', json['thisYear']);
        this.store.dispatch({type: STREAKS_UPDATE, payload: streaks})
    }

    streakFromJson(title: string, json: any) {
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
