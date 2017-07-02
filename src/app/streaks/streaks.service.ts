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

    load() {
        this.http.get('api/streaks').catch(err => {
            return Observable.throw('failed to load streaks');
        }).subscribe(x => this.update(x.json()));
    }

    update(json: any) {
        let streaks = new StreaksModel();
        streaks.longest = this.streakFromJson('Longest Streak Ever', json['longest']);
        streaks.current = this.streakFromJson('Current Streak', json['current']);
        streaks.thisYear = this.streakFromJson('Longest Streak This Year', json['thisYear']);
        this.store.dispatch({type: STREAKS_UPDATE, payload: streaks})
    }

    streakFromJson(title: string, json: any) {
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
