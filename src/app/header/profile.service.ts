import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { PROFILE_SET } from '../state/profile.reducer';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {

    constructor(public store: Store<AppState>, public http: Http) { }

    load() {
        this.http.get('api/profile').catch(err => {
            return Observable.throw('failed to load profile');
        }).subscribe(x => this.store.dispatch({type: PROFILE_SET, payload: x.json()}));
    }  

}
