import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import { ChallengeModel } from '../state/challenge.model'
import { UPDATE_CHALLENGE } from '../state/challenges.reducer';

@Injectable()
export class ChallengesService {

    constructor(public store: Store<AppState>, public http: Http) { }

    load() {
        this.http.get('api/challenges').catch(err => {
            return Observable.throw('failed to load shoes');
        }).subscribe(x => this.update(x.json()));
    }

    private update(json: Array<ChallengeModel>) {
        for (let entry of json) {
            let model = new ChallengeModel();
            model.name = entry.name;
            model.description = entry.description;
            model.distanceTotal = entry.distanceTotal;
            model.distanceDone = entry.distanceDone;
            model.percentage = entry.percentage;
            model.progress = entry.progress;

            this.store.dispatch({type: UPDATE_CHALLENGE, payload: model});
        }
    }

}