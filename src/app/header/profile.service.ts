import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { PROFILE_SET } from '../state/profile.reducer';
import { AbstractTimedHttpService, Scheduler } from '../service/abstract-timed-http.service';

@Injectable()
export class ProfileService extends AbstractTimedHttpService {

    constructor(public store: Store<AppState>, scheduler: Scheduler, public http: Http) { 
        super(store, scheduler, http);
    }

    getInterval() {
        return 300000;
    }

    getPath() {
         return '/api/profile'
    };

    getErrorMessage() {
        return 'failed to load profile';
    }

    before() {
        return {};
    }

    failure(response: Response, before: any) { }

    success(response: Response, before: any) {
        this.store.dispatch({type: PROFILE_SET, payload: response.json()});
    }

}
