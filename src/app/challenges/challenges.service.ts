import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ChallengeModel } from '../state/challenge.model'
import { UPDATE_CHALLENGE } from '../state/challenges.reducer';
import { AbstractTimedHttpService } from '../service/abstract-timed-http.service';

@Injectable()
export class ChallengesService extends AbstractTimedHttpService {

    constructor(public store: Store<AppState>, public http: Http) { 
        super(http);
    }

    getInterval() {
        return 30000;
    }

    getPath() {
         return '/api/challenges'
    };

    getErrorMessage() {
        return 'failed to load challenges';
    }

    before() {
        return {};
    }

    failure(response: Response, before: any) { }

    success(json: Array<ChallengeModel>, before: any) {
        for (let entry of json) {
            let model = new ChallengeModel();
            model.name = entry.name;
            model.description = entry.description;
            model.distanceTotal = entry.distanceTotal;
            model.distanceDone = entry.distanceDone;
            model.percentage = entry.percentage;
            model.progress = entry.progress;

            // this.store.dispatch({type: UPDATE_CHALLENGE, payload: model});
        }
    }

}