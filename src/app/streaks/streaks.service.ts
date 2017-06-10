import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { STREAKS_UPDATE } from '../state/streaks.reducer';

@Injectable()
export class StreaksService {

    constructor(public store: Store<AppState>, public http: Http) { }

    STREAKS = {
        longest: {
            title: 'Longest Streak Ever',
            subtitle: 'Jan 1, 2015 through Oct 1, 2015',
            lineOne: '274 days',
            lineTwo: '274 runs',
            percentage: 100,
            progress: 'GOOD'
        },
        current: {
            title: 'Current Streak',
            subtitle: 'Jun 7, 2017 through Jun 9, 2017',
            lineOne: '3 days',
            lineTwo: '3 runs',
            percentage: 1,
            progress: 'BAD'
        },
        thisYear: {
            title: 'Longest Streak This Year',
            subtitle: 'Dec 4, 2016 through Jun 2, 2017',
            lineOne: '181 days',
            lineTwo: '184 runs',
            percentage: 69,
            progress: 'OK'
        }
    };

    load() {
        this.store.dispatch({type: STREAKS_UPDATE, payload: this.STREAKS});
    }

}